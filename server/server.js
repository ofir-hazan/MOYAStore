const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 3001

const app = express();
const bodyParser = require('body-parser')
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


app.use(cors(corsOptions))
const Product = require('./models/Product');
const Order = require('./models/order');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connect('mongodb+srv://admin:admin123@cluster.338smzg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, dbName: "Assignment2" })
    .then(() => {
        console.log("mongo connection open!");
    }).catch(err => {
        console.log("no connection start");
    })
   
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

//to load data
app.get('/product/insert', async (req, res) => {
    const product = await Product.insertMany([    {
        name: "ביסלי",
        description: "חטיף מלוח",
        price: 5.90,
        picture:
          "http://front.balibar.net/uploads/images/thumb_55f07e22d9621.png",
      },
      {
        "name": "במבה",
        "description": "חטיף בוטנים מלוח",
        "price": 3.90,
        "picture":
          "https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/WRZ28_L_P_68770_1.png",
      },
      {
        "name": "תפוצ׳יפס",
        "description": "חטיף תפוח אדמה מלוח",
        "price": 4.90,
        "picture":
          "https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/DII30_Z_P_178707_1.png",
      }]);
    res.status(200).end();
})

app.use(bodyParser.json());

app.post('/orders/insert', async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).end();
})

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
})