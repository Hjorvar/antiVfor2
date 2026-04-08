// Nýtt efni: Controller sem grípur request frá notanda ákveður hvað á að gera
const recipeService = require('../services/recipeService');

// Request (req) og Response (res)
const getHomePage = async (req, res) => {
    try {
        // Nýtt efni: Beðið eftir svörum frá gagnagrunni (með hjálp Service-lagsins)
        const recipes = await recipeService.getAllRecipes();

        // Senda bæði title og gögnin (recipes array-ið) í view-ið
        res.render('index', {
            title: 'Uppskriftavefurinn',
            recipes: recipes // Render index.ejs með DB gögnum!
        });
    } catch (error) {
        console.error('Villa við að sækja uppskriftir:', error);
        // Best að sýna bara einhverja einfalda villusíðu ef DB dettur niður
        res.status(500).send('Kerfisvilla - Get ekki hlaðið uppskriftum');
    }
};

// NÝTT: Stýring fyrir staka uppskrift
const getRecipeDetails = async (req, res) => {
    try {
        const id = req.params.id; // Sækjum ID úr slóðinni (URL)
        const recipe = await recipeService.getRecipeById(id);

        // Ef notandi slær inn ID sem er ekki til (t.d. /uppskriftir/999)
        if (!recipe) {
            return res.status(404).send('Úps! Uppskriftin fannst ekki.'); 
            // Seinni tíma viðbót: res.render('404') ef þið smíðið villusíðu
        }

        // Senda gögnin í nýtt view
        res.render('recipe-details', {
            title: recipe.title,
            recipe: recipe 
        });
    } catch (error) {
        console.error('Villa við að sækja staka uppskrift:', error);
        res.status(500).send('Kerfisvilla - Get ekki hlaðið uppskriftinni');
    }
};

// NÝTT: Sýnir EJS síðuna með HTML forminu
const getAddRecipeForm = (req, res) => {
    res.render('add-recipe', {
        title: 'Bæta við uppskrift'
    });
};

// NÝTT: Grípur POST request þegar formið er sent inn
const createNewRecipe = async (req, res) => {
    try {
        // 1. Sækjum gögnin úr forminu (nafnið á breytunum kemur úr 'name' attribute í HTML)
        // Til dæmis: <input name="title"> verður req.body.title
        const { title, time_minutes, image_url } = req.body;

        // 2. Einföld staðfesting (Validation) - Gakktu úr skugga um að titill sé til staðar
        if (!title) {
            return res.status(400).send('Titill uppskriftar má ekki vera tómur!');
        }

        // 3. Sendum gögnin niður í Service-lagið sem talar við gagnagrunninn
        const newRecipe = await recipeService.createRecipe(title, time_minutes, image_url);

        // 4. Áframsendum notandann (Redirect) á nýju uppskriftina eða á forsíðuna
        res.redirect(`/uppskriftir/${newRecipe.id}`);
        
    } catch (error) {
        console.error('Villa við að búa til uppskrift:', error);
        res.status(500).send('Kerfisvilla - Tókst ekki að vista uppskrift');
    }
};

module.exports = {
    getHomePage,
    getRecipeDetails, // NÝTT: Munið að exporta!
    getAddRecipeForm, // Exporta
    createNewRecipe   // Exporta
};
