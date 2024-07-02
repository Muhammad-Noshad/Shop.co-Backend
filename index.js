const express = require('express');
var cors = require('cors')
const connectDB = require("./connectDB");

const signUpRouter = require("./routers/sign-up");
const signInRouter = require("./routers/sign-in");

const app = express();
const PORT = 8000;

connectDB("mongodb://127.0.0.1:27017/shop-co");

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);

app.listen(PORT, () => console.log("Server started at Port:", PORT));