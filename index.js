const express = require('express');

const { connectDB } = require("./connectDB");

//const cors = require('cors')
const cookieParser = require("cookie-parser");
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });

const tokenRouter = require("./routers/token");
const userRouter = require("./routers/user");
const profileRouter = require("./routers/profile");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB(process.env.DB_URL);

// const corsOptions = {
//   origin: 'https://shop-co-blond.vercel.app',
//   credentials: true,
//   methods: ['POST', 'PATCH', 'DELETE', 'GET']
// };

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://shop-co-blond.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

//app.use(cors(corsOptions));
app.use(limiter);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/token", tokenRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => console.log("Server started at PORT:", PORT));