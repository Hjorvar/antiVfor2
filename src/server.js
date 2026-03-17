const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
// We need to tell Express where the views are located
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Root route - Renders index.ejs
app.get('/', (req, res) => {
    res.render('index', { title: 'Uppskriftavefurinn' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running closely on http://localhost:${PORT}`);
});
