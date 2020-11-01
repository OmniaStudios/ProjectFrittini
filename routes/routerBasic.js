/* Importazione express */
const express = require('express');

/* Importazione controller necessari */
const controllerBasic = require('../controllers/controllerBasic');

const router = express.Router();

/* Definizione route */
router
    .route('/')
    .get(controllerBasic.get_home);


/* Esportazione router */
module.exports = router;