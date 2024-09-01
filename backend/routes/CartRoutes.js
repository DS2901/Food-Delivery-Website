const express = require('express');
const { getCart, addToCart } = require('../controllers/CartControllers');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Route to get the cart
router.get('/', authenticateToken, getCart);

// Route to add items to the cart
router.post('/add', authenticateToken, addToCart);

module.exports = router;
