/* Richiesta modulo esportato da app.js */
const app = require('./app');

const express = require('express');

/* Definizione porta di accesso per deploy e test in locale */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`projectFrittini | Server started on port ${PORT} - use 'localhost;${PORT}`);
});
