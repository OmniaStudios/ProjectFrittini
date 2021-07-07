/* Importazione pacchetti necessari 
    - se non dovessero essere presenti, lanciare 'npm i --save' per caricarli da package.json */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const { flash } = require('express-flash-message');
const morgan = require('morgan')

/* Definizione app */
const app = express();
//TODO Non finire in carcere
/* Importazione dei router */
const routerBasic = require('./routes/routerBasic');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week 
            // secure: true
        },
    })
)
app.use(flash({ sessionKeyName: 'flashMessage' }));

/* app.use(morgan('dev')) */

app.use(express.static(__dirname + '/public'));
/* Impostazione del motore di rendering:
    - non è quindi necessario specificare l'estensione dei file nel 'res.render('nomefile')' */
app.set('view engine', 'ejs');

/* Impostazione dei router */
app.use('/', routerBasic);

/* Esportazione modulo app per l'utilizzo in server.js */
module.exports = app;

app.listen(3000);