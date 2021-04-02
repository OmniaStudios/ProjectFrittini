/* Richiesta modulo esportato da app.js */
const app = require('./app');

const express = require('express');
const mongoose = require('mongoose');

/* Definizione porta di accesso per deploy e test in locale */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`projectFrittini | Server started on port ${PORT} - use 'localhost:${PORT}`);
});

let db = require('./config/keys').MongoURI;
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('projectFrittini | MongoDB Connected');
})