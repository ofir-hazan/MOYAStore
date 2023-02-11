const express = require("express");
const { getAllSuppliers, addSupplier, updateSupplier, deleteSupplier } = require("../controllers/supplierController")
const router = express.Router();

router.get('/all', getAllSuppliers);
router.post('/add', addSupplier);
router.put('/update', updateSupplier);
router.delete('/delete', deleteSupplier);

module.exports = router;