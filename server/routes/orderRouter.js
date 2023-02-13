const express = require("express");
const { addOrder } = require("../controllers/orderController")
const router = express.Router();

router.post('/insert', addOrder);

module.exports = router;