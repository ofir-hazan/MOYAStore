const { default: mongoose } = require("mongoose");
// const { v4: uuidv4 } = require('uuid');

const User = require("../models/user");

exports.getUser = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        const user = await User.findOne({ uid: req.params.uid });
        res.status(200).send(user).end();
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}

exports.addUser = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        const user = req.body;
        User.insertMany(user)
            .then(resp => {
                res.status(200).send(resp).end();
            });
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}