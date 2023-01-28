
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        require: true,
    },
    categoryId: {
        type: String,
        require: true
    },
    supplierId: {
        type: String,
        require: true
    }
},
    {
        versionKey: false
    })

const Product = mongoose.model('products', productSchema);

module.exports = Product;