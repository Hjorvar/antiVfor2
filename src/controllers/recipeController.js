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

module.exports = {
    getHomePage
};
