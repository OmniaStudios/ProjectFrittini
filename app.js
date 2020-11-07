/* Importazione pacchetti necessari 
    - se non dovessero essere presenti, lanciare 'npm i --save' per caricarli da package.json */
const express = require('express');
const twilio = require('twilio');



/* Definizione app */
const app = express();
 //TODO Non finire in carcere
/* Importazione dei router */
const routerBasic = require('./routes/routerBasic');

app.use(express.static(__dirname + '/public'));

var accountSid = 'AC73d390faa0d03ab6ae7f14acc0ae7429';
var authToken = '35067d97bbd267334e236d340cacbf42';
var client = new twilio(accountSid, authToken);


console.log("EHI FRA!");
client.messages.create({
    body: 'Buongiornissimo!',
    to: '+393450420203',
    from: '+19257018054'
}).then((message) => console.log(message.sid));
console.log("Dimmi FRA!");

/* Impostazione del motore di rendering:
    - non è quindi necessario specificare l'estensione dei file nel 'res.render('nomefile')' */
app.set('view engine', 'ejs');

/* Impostazione dei router */
app.use('/', routerBasic);

/* Esportazione modulo app per l'utilizzo in server.js */
module.exports = app;

app.listen(3000);
