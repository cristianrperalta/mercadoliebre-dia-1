// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsApiController = require('../../controllers/api/productsController');

router.get('/latest', productsApiController.latest); /* GET - home page */
router.get('/offers', productsApiController.offers); /* GET - home page */

module.exports = router;