const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Order = require("../models/order");
const ProductInOrder = require("../models/productInOrder");

exports.addOrder = async (req, res, next) => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(async () => {
      const userId = req.body.uid;
      const orderId = uuidv4();
      const orderObject = {
        _id: orderId,
        orderDate: new Date(),
        totalPrice: parseInt(req.body.totalPrice),
        userId: userId,
      };
      const productsInOrder = req.body.products?.map((product) => {
        return {
          productId: product._id,
          orderId: orderId,
          quantity: product.quantity,
        };
      });
      await Order.insertMany(orderObject);
      ProductInOrder.insertMany(productsInOrder);
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
};

exports.getAllOrderByUser = async (req, res, next) => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(async () => {
      const orders = await Order.find({ userId: req.params.userid });
      // const orders = await Order.find({ userId: req.params.userid }).lean();
      // for (const order of orders) {
      //     const productsInOrder = await ProductInOrder.find({ orderId: order._id}).lean();
      //     orders[orders.indexOf(order)].products = productsInOrder;
      // }
      res.status(200).send(orders).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
};

exports.getAllProductsByOrder = async (req, res, next) => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(async () => {
      const productsInOrder = await ProductInOrder.find({
        orderId: req.params.orderid,
      });
      res.status(200).send(productsInOrder).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
};

exports.editOrder = async (req, res, next) => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(async () => {
      const products = req.body.products;
      const productsToDelete = req.body.productsToDelete;
      for (const product of products) {
        await ProductInOrder.updateOne(
          { _id: product._id },
          { quantity: product.quantity }
        );
      }
      for (const product of productsToDelete) {
        await ProductInOrder.deleteOne({ _id: product._id });
      }
      res.status(200).send().end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
};

exports.deleteOrder = async (req, res, next) => {
    mongoose
      .connect(process.env.DB_CONNECTION_STRING)
      .then(async () => {
        const orderId = req.params.orderid;
        await Order.deleteOne({_id: orderId});
        await ProductInOrder.deleteMany({ orderId: orderId });
        res.status(200).send().end();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      });
  };
