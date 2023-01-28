
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
},
    {
        versionKey: false
    })

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;