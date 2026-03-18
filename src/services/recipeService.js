// Nýtt efni: Service skráin sjá um viðskiptarök og DB köll.
const db = require('../lib/db');

// Öll föll sem eiga við DB verða að vera "async"
const getAllRecipes = async () => {
    // Sækir allar uppskriftir úr postgres
    const result = await db.query('SELECT * FROM recipes ORDER BY id ASC');
    // Result getur innihaldið allskonar metagögn (t.d. result.rowCount), okkur vantar bara result.rows
    return result.rows;
};

module.exports = {
    getAllRecipes
};
