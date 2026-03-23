// Nýtt efni: Skrá til að stjórna slóðum (Routes)
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Beinum rótinni (/) niður í recipeController sem sækir síðan úr DB
router.get('/', recipeController.getHomePage);

// NÝTT: Dýnamísk slóð fyrir staka uppskrift. 
// Táknið ':' gefur til kynna að 'id' sé breyta en ekki föst slóð.
router.get('/uppskriftir/:id', recipeController.getRecipeDetails);

module.exports = router;
