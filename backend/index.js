require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {User} = require("./model/UserModel"); 
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


//JWT MIDDLEWARE

function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET || "SECRET123", (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    req.user = user;
    next();
  });
}


//REGISTER

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" });
    }

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err); // Add this for debugging
    res.status(500).json({ msg: "Error registering user", error: err.message });
  }

});



//LOGIN  
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Use the comparePassword method from your User model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET , 
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
});



const { HoldingModel } = require("./model/HoldingModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;










app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingModel.find({});
  res.json(allHoldings);
});



app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});





app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder",async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});




app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});