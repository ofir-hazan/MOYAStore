
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
    firstName: {
        type: String
    },
    lastName: {
        type: String
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