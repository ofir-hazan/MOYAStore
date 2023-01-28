
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    location: {
        type: String
    }
},
    {
        versionKey: false
    })

const Supplier = mongoose.model('suppliers', supplierSchema);

module.exports = Supplier;