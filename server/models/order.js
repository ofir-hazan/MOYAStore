
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    orderDate: {
        type: Date,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
},
    {
        versionKey: false
    })

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;