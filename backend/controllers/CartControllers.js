// controllers/CartControllers.js
const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
      console.log("User ID:", req.user._id); // Log the user ID
      const cart = await Cart.findOne({ userId: req.user._id });
      if (!cart) return res.status(404).send("Cart not found");
      res.json(cart);
  } catch (error) {
      console.error("Error fetching cart:", error); // Log the error
      res.status(500).send("Server Error");
  }
};


const addToCart = async (req, res) => {
    try {
        const { item } = req.body;
        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            cart = new Cart({ userId: req.user._id, items: [item] });
        } else {
            cart.items.push(item);
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).send("Server Error");
    }
};

module.exports = { getCart, addToCart };
