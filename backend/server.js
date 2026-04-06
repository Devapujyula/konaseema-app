const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working 🚀");
});

app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database error");
    } else {
      res.json(result);
    }
  });
});

app.post("/api/orders", (req, res) => {
  console.log("Incoming order:", req.body);

  const { name, address, cart, total } = req.body;

  if (!name || !cart || cart.length === 0) {
    return res.status(400).send("Invalid data");
  }

  const orderQuery =
    "INSERT INTO orders (user_name, total, status) VALUES (?, ?, ?)";

  db.query(orderQuery, [name, total, "PLACED"], (err, result) => {
    if (err) {
      console.log("ORDER ERROR:", err);
      return res.status(500).send("Order error");
    }

    const orderId = result.insertId;

    cart.forEach((item) => {
      const itemQuery =
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)";

      db.query(itemQuery, [orderId, item.id, item.quantity]);
    });

    res.json({ message: "Order saved successfully" });
  });
});

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_SYVcGNOFWbllpD",
  key_secret: "Qq1FjY5UvIgqXkxTne9oX3wx",
});

app.post("/api/create-order", async (req, res) => {
  const { total } = req.body;

  const options = {
    amount: total * 100, // paise
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  const order = await razorpay.orders.create(options);
  res.json(order);
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🔥");
});
