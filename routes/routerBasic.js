/* Importazione express */
const express = require('express');

/* Importazione controller necessari */
const controllerBasic = require('../controllers/controllerBasic');

const router = express.Router();

/* Definizione route */
router
    .route('/')
    .get(controllerBasic.get_home);

router
    .route('/menu')
    .get(controllerBasic.get_menu);

 router
    .route('/menufamily')
    .get(controllerBasic.get_menu);

/* Esportazione router */
module.exports = router;