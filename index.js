const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectDB = require("./connectDB");

const verifyTokenRouter = require("./routers/verify-token");

const signUpRouter = require("./routers/sign-up");
const signInRouter = require("./routers/sign-in");

const app = express();
const PORT = 8000;

connectDB("mongodb://127.0.0.1:27017/shop-co");

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,               // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/verify-token", verifyTokenRouter);

app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);

app.listen(PORT, () => console.log("Server started at Port:", PORT));