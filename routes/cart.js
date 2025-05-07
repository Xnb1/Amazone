const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.js");
const isLoggedIn = require("../middleware.js");
const Prodct = require("./product.js");
const user = require("./user.js");



// router.get("/cart", async(req,res) => {
//     let {user, product, quantity} = req.params;
//     let cart = await Cart.findOne({ user, product, quantity});
//     res.render("cart.ejs", {cart});
// });


//add product to cart, check item exists(if yes update quantity, if not add the item)
router.post("/add-to-cart", isLoggedIn, async (req, res) => {
    let {user, product, quantity} = req.body;
    // console.log(req.body);

//    res.send("post req working");
    

    try {
        let cart = await Cart.findOne({ user });
        
        if (!cart) {
            cart = new Cart ({user, items:[]});
            
        }

        //check if item exists in the cart
        const existingItem = cart.items.find((item) => item.product === product);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);      //update quantity
        } else {
            cart.items.push({product, quantity:parseInt(quantity) })  //add new product
        }

        await cart.save();
        // res.redirect("/view");
       res.redirect("/cart");
    } catch (err) {
        console.log("Error adding to cart", err);
        res.status(500).send("Something went wrong");
    }
});

//Get cart items
// router.get("/:userId", async(req,res) => {
//     const user = req.params.user;
//     try {
//       const cart = await Cart.findOne({ user }).populate(items.product);
//       res.render("cart.ejs", { cart });
//     } catch(err) {
//         console.log(err);
//     }
// });

router.get("/cart", isLoggedIn, async (req, res) => {
    try {
      const userId = req.user;
    //   const userId = req.user._id;
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
  
      res.render("cart.ejs", { cart });
    } catch (err) {
      console.error("Error fetching cart:", err);
      res.status(500).send("Failed to load cart.");
    }
  });

module.exports = router;