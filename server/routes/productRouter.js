const express = require("express");
const { getAllProducts, updateProduct, deleteProduct, addProduct } = require("../controllers/productController")
const router = express.Router();

router.get('/all', getAllProducts);
router.put('/update', updateProduct);
router.put('/delete', deleteProduct);
router.post('/add', addProduct);

module.exports = router;