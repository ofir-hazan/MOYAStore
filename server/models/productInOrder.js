
const mongoose = require('mongoose');

const productInOrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        require: true
    },
    productId: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
},
    {
        versionKey: false
    })

const ProductInOrder = mongoose.model('Products_In_Orders', productInOrderSchema);

module.exports = ProductInOrder;