// Nýtt efni: Sækjum dotenv til að lesa .env skrána (DATABASE_URL osfrv)
require('dotenv').config();

const express = require('express');
const path = require('path');
// Nýtt efni: Sækjum Routerinn okkar
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
// We need to tell Express where the views are located
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Nýtt efni: Notum route-ið okkar í staðinn fyrir harðkóðað app.get hjá okkur
app.use('/', recipeRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running closely on http://localhost:${PORT}`);
});
