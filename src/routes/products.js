// ************ Require's ************
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
// MULTER //
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/images/products');
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
})

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.any(), productsController.store);

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.patch('/edit/:id', upload.any(), productsController.update); 

/*** DELETE ONE PRODUCT ***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
