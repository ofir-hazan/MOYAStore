const express = require("express");
const { getAllCategories } = require("../controllers/categoryController");
const router = express.Router();

router.get('/all', getAllCategories)

module.exports = router;