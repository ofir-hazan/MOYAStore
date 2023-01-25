const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    products: {
        type: Array,
        require: true
    },
    additionalInfo: {
        type: String
    },
    totalPrice: {
        type: Number,
        require: true,
    }
})

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
