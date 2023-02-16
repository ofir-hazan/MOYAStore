
const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Product = require("../models/product");
// const ProductInOrder = require("../models/productInOrder");
exports.getAllProducts = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        const products = await Product.find({});
        // await Product.insertMany([{
        //     "_id": uuidv4(),
        //     "name": "Orange",
        //     "description": "A round orange fruit",
        //     "image": "https://en.wikipedia.org/wiki/Orange_%28fruit%29#/media/File:Oranges_-_whole-halved-segment.jpg",
        //     "price": 3.9,
        //     "categoryId": "1"
        // }])
        // await ProductInOrder.insertMany([{
        //     orderId: "80fb0b41-fee2-419d-b4ad-e5430c001a56",
        //     productId: "b6d2a6b3-8d2b-462a-921e-6309e1cafa9a",
        //     quantity: 1
        // }])
        res.status(200).send(products).end();
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}

exports.updateProduct = async (req, res, next) => {
    const productData = req.body;
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        await Product.updateOne({_id: productData._id}, productData);
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}

exports.deleteProduct = async (req, res, next) => {
    const productId = req.body.id;
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        await Product.deleteOne({_id: productId});
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}

exports.addProduct = async (req, res, next) => {
    const product = req.body;
    product._id = uuidv4();
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        await Product.insertMany([product]);
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}