const express = require('express');

const { connectDB } = require("./connectDB");

const cors = require('cors')
const cookieParser = require("cookie-parser");

const tokenRouter = require("./routers/token");
const userRouter = require("./routers/user");
const profileRouter = require("./routers/profile");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB("mongodb://127.0.0.1:27017/shop-co");

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/token", tokenRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => console.log("Server started at Port:", PORT));