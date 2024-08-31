const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

// Fetch user cart
router.get('/user-cart', authenticateToken, async (req, res) => {
  try {
    const cartItems = await Cart.findOne({ userId: req.user.id });
    res.json({ cartItems: cartItems ? cartItems.items : [] });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Add item to cart
router.post('/add-to-cart', authenticateToken, async (req, res) => {
  try {
    const { item } = req.body;
    await Cart.updateOne(
      { userId: req.user.id },
      { $push: { items: item } },
      { upsert: true }
    );
    res.status(200).send('Item added to cart');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
