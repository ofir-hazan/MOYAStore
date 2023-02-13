const express = require("express");
const { addOrder, getAllOrderByUser, getAllProductsByOrder, editOrder, deleteOrder } = require("../controllers/orderController")
const router = express.Router();

router.post('/insert', addOrder);
router.get('/:userid', getAllOrderByUser);
router.get('/orderProducts/:orderid', getAllProductsByOrder);
router.post('/editOrder/:orderid', editOrder);
router.get('/deleteOrder/:orderid', deleteOrder);

module.exports = router;