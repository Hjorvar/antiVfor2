// Nýtt efni: Gagnagrunnstengingin (Database Layer)
const { Pool } = require('pg');

// Notar sjálfkrafa DATABASE_URL úr .env skránni (vegna require('dotenv').config() í server.js)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Nýtt efni: Exportar falli ('query') svo við getum notað async/await hvar sem er 
// í appinu til að gera fyrirspurnir í gagnagrunninn.
module.exports = {
    query: (text, params) => pool.query(text, params),
};
