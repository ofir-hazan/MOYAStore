const { default: mongoose } = require("mongoose");

const Category = require("../models/category");

exports.getAllCategories = async (req, res, next) => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(async () => {
      const categories = await Category.find({});
      res.status(200).send(categories).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
};
