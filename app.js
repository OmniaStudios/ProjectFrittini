/* Importazione pacchetti necessari
    - se non dovessero essere presenti, lanciare 'npm i --save' per caricarli da package.json */
const express = require('express');

/* Definizione app */
const app = express();

/* Importazione dei router */
const routerBasic = require('./routes/routerBasic');

app.use(express.static(__dirname + '/public'));

/* Impostazione del motore di rendering:
    - non è quindi necessario specificare l'estensione dei file nel 'res.render('nomefile')' */
app.set('view engine', 'ejs');

/* Impostazione dei router */
app.use('/', routerBasic);

/* Esportazione modulo app per l'utilizzo in server.js */
module.exports = app;
