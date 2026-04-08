// Nýtt efni: Skrá til að stjórna slóðum (Routes)
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Beinum rótinni (/) niður í recipeController sem sækir síðan úr DB
router.get('/', recipeController.getHomePage);

// NÝTT: GET slóð sem birtir formið (VERÐUR AÐ KOMA Á UNDAN /:id)
router.get('/uppskriftir/ny', recipeController.getAddRecipeForm);

// NÝTT: POST slóð sem tekur við gögnunum úr forminu
router.post('/uppskriftir/ny', recipeController.createNewRecipe);

// NÝTT: Dýnamísk slóð fyrir staka uppskrift. 
// Táknið ':' gefur til kynna að 'id' sé breyta en ekki föst slóð.
router.get('/uppskriftir/:id', recipeController.getRecipeDetails);

module.exports = router;
