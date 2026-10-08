require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("./model/UserModel");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


//JWT MIDDLEWARE

function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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

    const newUser = new User({ username, password, funds: 100000, usedMargin: 0 });
    await newUser.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
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
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        funds: user.funds != null ? user.funds : 100000,
      },
    });
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










// USER FUNDS
app.get("/userFunds", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const availableCash = user.funds != null ? user.funds : 100000;
    const usedMargin = user.usedMargin != null ? user.usedMargin : 0;

    res.json({
      availableCash,
      usedMargin,
    });
  } catch (err) {
    console.error("Error fetching funds:", err);
    res.status(500).json({ msg: "Error fetching funds", error: err.message });
  }
});

app.post("/addFunds", auth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ msg: "Invalid deposit amount" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.funds = (user.funds != null ? user.funds : 100000) + amount;
    await user.save();

    res.json({ msg: "Funds added successfully", availableCash: user.funds });
  } catch (err) {
    console.error("Error adding funds:", err);
    res.status(500).json({ msg: "Error adding funds", error: err.message });
  }
});

app.post("/withdrawFunds", auth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ msg: "Invalid withdrawal amount" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const currentFunds = user.funds != null ? user.funds : 100000;
    if (amount > currentFunds) {
      return res.status(400).json({ msg: "Insufficient available cash balance" });
    }

    user.funds = currentFunds - amount;
    await user.save();

    res.json({ msg: "Funds withdrawn successfully", availableCash: user.funds });
  } catch (err) {
    console.error("Error withdrawing funds:", err);
    res.status(500).json({ msg: "Error withdrawing funds", error: err.message });
  }
});

// HOLDINGS (USER DYNAMIC)
app.get("/allHoldings", auth, async (req, res) => {
  try {
    const userHoldings = await HoldingModel.find({ userId: req.user.id });
    res.json(userHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ msg: "Error fetching holdings", error: err.message });
  }
});

// ORDERS (USER DYNAMIC)
app.get("/allOrders", auth, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({ userId: req.user.id }).sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ msg: "Error fetching orders", error: err.message });
  }
});

// POSITIONS (USER DYNAMIC)
app.get("/allPositions", auth, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({ userId: req.user.id });
    res.json(allPositions);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ msg: "Error fetching positions", error: err.message });
  }
});

// NEW ORDER (STANDARD TRADING LOGIC)
app.post("/newOrder", auth, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const orderQty = parseInt(qty, 10);
    const orderPrice = parseFloat(price);
    const orderMode = (mode || "BUY").toUpperCase();

    if (!name || isNaN(orderQty) || orderQty <= 0 || isNaN(orderPrice) || orderPrice <= 0) {
      return res.status(400).json({ msg: "Invalid order parameters" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.funds == null) {
      user.funds = 100000;
    }

    const totalOrderCost = orderQty * orderPrice;

    if (orderMode === "BUY") {
      // 1. Margin / Funds Validation
      if (user.funds < totalOrderCost) {
        return res.status(400).json({
          msg: `Insufficient available funds. Required: ₹${totalOrderCost.toFixed(2)}, Available: ₹${user.funds.toFixed(2)}`,
        });
      }

      // 2. Deduct Funds
      user.funds -= totalOrderCost;
      await user.save();

      // 3. Update Holdings with Weighted Average Cost
      let holding = await HoldingModel.findOne({ userId: req.user.id, name });
      if (holding) {
        const previousCost = holding.qty * holding.avg;
        const newTotalQty = holding.qty + orderQty;
        const newWeightedAvg = (previousCost + totalOrderCost) / newTotalQty;

        holding.qty = newTotalQty;
        holding.avg = parseFloat(newWeightedAvg.toFixed(2));
        holding.price = orderPrice;
        const pctChg = (((orderPrice - holding.avg) / holding.avg) * 100).toFixed(2);
        holding.net = (pctChg >= 0 ? "+" : "") + pctChg + "%";
        holding.day = "+0.00%";
        holding.isLoss = holding.price < holding.avg;
        await holding.save();
      } else {
        holding = new HoldingModel({
          userId: req.user.id,
          name,
          qty: orderQty,
          avg: orderPrice,
          price: orderPrice,
          net: "+0.00%",
          day: "+0.00%",
          isLoss: false,
        });
        await holding.save();
      }

      // 4. Update Positions
      let position = await PositionsModel.findOne({ userId: req.user.id, name });
      if (position) {
        position.qty += orderQty;
        position.price = orderPrice;
        await position.save();
      } else {
        position = new PositionsModel({
          userId: req.user.id,
          product: "CNC",
          name,
          qty: orderQty,
          avg: orderPrice,
          price: orderPrice,
          net: "+0.00%",
          day: "+0.00%",
          isLoss: false,
        });
        await position.save();
      }

    } else if (orderMode === "SELL") {
      // 1. Check if user holds the instrument and has sufficient quantity
      let holding = await HoldingModel.findOne({ userId: req.user.id, name });
      if (!holding || holding.qty < orderQty) {
        const availableQty = holding ? holding.qty : 0;
        return res.status(400).json({
          msg: `Insufficient quantity to sell. You currently hold ${availableQty} shares of ${name}.`,
        });
      }

      // 2. Credit funds from sale
      user.funds += totalOrderCost;
      await user.save();

      // 3. Update or remove holding
      if (holding.qty === orderQty) {
        await HoldingModel.deleteOne({ _id: holding._id });
      } else {
        holding.qty -= orderQty;
        holding.price = orderPrice;
        const pctChg = (((orderPrice - holding.avg) / holding.avg) * 100).toFixed(2);
        holding.net = (pctChg >= 0 ? "+" : "") + pctChg + "%";
        holding.isLoss = holding.price < holding.avg;
        await holding.save();
      }

      // 4. Update or remove position
      let position = await PositionsModel.findOne({ userId: req.user.id, name });
      if (position) {
        if (position.qty <= orderQty) {
          await PositionsModel.deleteOne({ _id: position._id });
        } else {
          position.qty -= orderQty;
          position.price = orderPrice;
          await position.save();
        }
      }
    } else {
      return res.status(400).json({ msg: "Invalid order mode. Must be BUY or SELL." });
    }

    // 5. Record completed order
    const newOrder = new OrdersModel({
      name,
      qty: orderQty,
      price: orderPrice,
      mode: orderMode,
      userId: req.user.id,
    });
    await newOrder.save();

    res.json({
      msg: `${orderMode} order for ${orderQty}x ${name} executed successfully!`,
      order: newOrder,
      availableCash: user.funds,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ msg: "Error creating order", error: err.message });
  }
});




app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});