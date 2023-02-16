const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const productRouter = require("./routes/productRouter");
const { runScraping } = require("./src/scraping/scraping");
const supplierRouter = require("./routes/supplierRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");
const categoryRouter = require("./routes/categoryRouter")
const socketIo = require("socket.io");

const port = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let connectedUsers = 0;
io.on("connection", (socket) => {
  console.log("a user connected");
  connectedUsers++;
  io.emit('signedIn', connectedUsers);
  // socket.on("signIn", () => {
  //   // do shit
  //   console.log('got to sign in');
  //   io.emit('signedIn', connectedUsers);
  // });

  socket.on("disconnect", (reason) => {
    connectedUsers--;
    io.emit('signedIn', connectedUsers);
    console.log('got to sign off');
  });
});
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(methodOverride("_method"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).end();
});

app.post("/scraping", (req, res) => {
  runScraping();
  res.status(200).end();
});

app.use("/products", productRouter);
app.use("/suppliers", supplierRouter);
app.use("/user", userRouter);
app.use("/orders", orderRouter);
app.use("/categories", categoryRouter)

// send 404 if no other route matched
app.all("*", (req, res, next) => {
  next(
    res.status(404).json({
      status: "error",
      message: `Can't find ${req.originalUrl} on this server!`,
    })
  );
});

server.listen(port, () => {
  console.log("listening on port 3001!");
});
