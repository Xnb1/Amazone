const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.js");

//add product to cart, check item exists(if yes update quantity, if not add the item)
router.post("/add-to-cart", async(req, res) => {
    let {userId, productId, quantity} = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart ({userId, items:[]});
        }

        //check if item exists in the cart
        const existingItem = cart.items.find((item) => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;      //update quantity
        } else {
            cart.items.push({productId, quantity})  //add new product
        }

        await cart.save();
        res.redirect("/view");
    } catch (err) {
        console.log(err);
    }
});

//Get cart items
router.get("/:userId", async(req,res) => {
    try {
      const cart = await Cart.findOne({userId: req.params.userId}).populate(items.productId);
      res.status(200).json(cart);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;