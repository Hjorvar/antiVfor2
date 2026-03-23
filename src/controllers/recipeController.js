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

module.exports = {
    getHomePage,
    getRecipeDetails // NÝTT: Munið að exporta!
};
