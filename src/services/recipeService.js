// Nýtt efni: Service skráin sjá um viðskiptarök og DB köll.
const db = require('../lib/db');

// Öll föll sem eiga við DB verða að vera "async"
const getAllRecipes = async () => {
    // Sækir allar uppskriftir úr postgres
    const result = await db.query('SELECT * FROM recipes ORDER BY id ASC');
    // Result getur innihaldið allskonar metagögn (t.d. result.rowCount), okkur vantar bara result.rows
    return result.rows;
};

// NÝTT: Fall til að sækja staka uppskrift eftir ID
const getRecipeById = async (id) => {
    // Við notum $1 til að setja id inn í fyrirspurnina á öruggan hátt
    const result = await db.query('SELECT * FROM recipes WHERE id = $1', [id]);
    
    // Ef engin uppskrift fannst skilar gagnagrunnurinn tómri fylki (array)
    if (result.rows.length === 0) {
        return null;
    }
    
    // Skilum fyrstu (og einu) línunni sem fannst
    return result.rows[0];
};

// NÝTT: Fall til að búa til nýja uppskrift
const createRecipe = async (title, timeMinutes, imageUrl) => {
    // Notum $1, $2, $3 til að verjast SQL innspýtingum. 
    // RETURNING * gerir það að verkum að gagnagrunnurinn skilar nýju röðinni (t.d. með nýja ID-inu)
    const sql = `
        INSERT INTO recipes (title, time_minutes, image_url) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    const values = [title, timeMinutes, imageUrl];
    
    const result = await db.query(sql, values);
    return result.rows[0]; // Skilum nýju uppskriftinni
};

module.exports = {
    getAllRecipes,
    getRecipeById, // NÝTT: Munið að exporta nýja fallinu!
    createRecipe // Munið að exporta!
};
