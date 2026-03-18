// Nýtt efni: Skrá til að stjórna slóðum (Routes)
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Beinum rótinni (/) niður í recipeController sem sækir síðan úr DB
router.get('/', recipeController.getHomePage);

module.exports = router;
