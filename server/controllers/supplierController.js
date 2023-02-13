const { default: mongoose } = require("mongoose");

const Supplier = require("../models/supplier");

exports.getAllSuppliers = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        const suppliers = await Supplier.find({});
        res.status(200).send(suppliers).end();
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}

exports.addSupplier = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        const supplier = req.body;
        await Supplier.insertMany(supplier)
            .then(resp => {
                res.status(200).send(resp).end();
            });
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}

exports.updateSupplier = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        const updatedSupplier = req.body;
        await Supplier.findOneAndUpdate({_id: req.params._id}, updatedSupplier)
            .then(resp => {
                res.status(200).send(resp).end();
            });
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}

exports.deleteSupplier = async (req, res, next) => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        await Supplier.deleteOne({_id: req.params._id})
            .then(resp => {
                res.status(200).send(resp).end();
            });
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}