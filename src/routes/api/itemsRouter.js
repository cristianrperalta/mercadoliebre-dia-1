// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Middlewares ************

const authMiddleware = require('../../middlewares/auth');
const validator = require('../../middlewares/validator');

// ************ Controller Require ************

const productsControllerApi = require('../../controllers/api/itemsController');

// ************  Multer Config  ***************

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, path.resolve(__dirname, '../../../public/images/products'))
    },
    filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
 })
 
 var upload = multer({
    storage,
 
    // Validate image
    fileFilter: (req, file, cb) => {
 
       const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
 
       const ext = path.extname(file.originalname);
       
       if (!acceptedExtensions.includes(ext)) {
          req.file = file;
       }
 
       cb(null, acceptedExtensions.includes(ext));
    }
 });

 // ************       Routes       ************

 router.post('/items', 
    //authMiddleware, 
    //upload.single('image'), 
    //validator.createProduct, 
    productsControllerApi.addToCart)

 module.exports = router;