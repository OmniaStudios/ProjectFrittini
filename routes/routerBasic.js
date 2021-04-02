/* Importazione express */
const express = require('express');

/* Importazione controller necessari */
const controllerBasic = require('../controllers/controllerBasic');

const router = express.Router();

/* Definizione route */
router
    .route('/')
    .get(controllerBasic.get_home)
    .post(controllerBasic.new_number);

router
    .route('/menu')
    .get(controllerBasic.get_menu);

 router
    .route('/menufamily')
    .get(controllerBasic.get_menu_family);

router
    .route('/products')
    .get(controllerBasic.get_products);

router
    .route('/workwithus')
    .get(controllerBasic.get_work)
    .post(controllerBasic.post_work);

router
    .route('/aboutus')
    .get(controllerBasic.get_aboutus);

/* Esportazione router */
module.exports = router;