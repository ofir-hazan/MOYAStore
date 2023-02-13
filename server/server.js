const express = require('express');
const cors = require("cors");
require("dotenv").config();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const productRouter = require("./routes/productRouter");
const supplierRouter = require("./routes/supplierRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");

const port = process.env.PORT || 3001;

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(methodOverride('_method'));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).end();
})

app.use('/products', productRouter);
app.use('/suppliers', supplierRouter);
app.use('/user', userRouter);
app.use('/orders', orderRouter);

// send 404 if no other route matched
app.all('*', (req, res, next) => {
  next(res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`
  }))
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
})