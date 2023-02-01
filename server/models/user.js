
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
},
    {
        versionKey: false
    })

const User = mongoose.model('users', userSchema);

module.exports = User;