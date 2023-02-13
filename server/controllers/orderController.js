const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Order = require("../models/order");
const ProductInOrder = require("../models/productInOrder");

exports.addOrder = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        const userId = req.body.userId;
        const orderId = uuidv4();
        const orderObject = {
            _id: orderId,
            orderDate: new Date(),
            totalPrice: parseInt(req.body.totalPrice),
            userId: userId
        };
        const productsInOrder = req.body.products?.map((product) => {return {productId: product._id, orderId: orderId, quantity: product.quantity}});
        await Order.insertMany(orderObject);
        ProductInOrder.insertMany(productsInOrder);
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    });
};

exports.getAllOrderByUser = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).send(orders).end();
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}