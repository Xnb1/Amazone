const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.js");
const isLoggedIn = require("../middleware.js");
const Prodct = require("./product.js");
const user = require("./user.js");






//add product to cart, check item exists(if yes update quantity, if not add the item)
router.post("/cart", isLoggedIn, async (req, res) => {
    let { product, quantity} = req.body;
    let user = req.user._id;
    // console.log(req.body);

  //  res.send("post req working");
    

    try {
        let cart = await Cart.findOne({ user });
        
        if (!cart) {
            cart = new Cart ({user, items:[]});
            
            
        }

    //     //check if item exists in the cart
        const existingItem = cart.items.find((item) => item.product.toString() === product);
        
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);      //update quantity
        } else {
            cart.items.push({product, quantity:parseInt(quantity) })  //add new product
        } 

        await cart.save();

       res.redirect("/cart");
    } catch (err) {
        console.log("Error adding to cart", err);
        res.status(500).send("Something went wrong");
    }
});

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

router.post("/cart/update", isLoggedIn, async(req, res) => {
  const userId = req.user;
  const {productId, action} = req.body;
  

  try {
    const cart = await Cart.findOne({user: userId});
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item => item.product.toString() === productId));
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      item.quantity -= 1;
      // item.quantity = Math.max(0, item.quantity - 1); // avoid 0
        if (item.quantity <= 0) {
          cart.items.splice(item, 1);
        }
    }

    if (cart.items.length === 0) {
      await Cart.findOneAndDelete({user: userId});
      return res.json ({success: true, message: "Cart emptied and deleted"});
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    console.error("Cart update error:", err);
    res.status(500).json({ message: "Internal error" });
  }
    
  //   if (item) {
  //     if (action === "increase") {
  //       item.quantity += 1;
  //     } else if (action === "decrease") {
  //         item.quantity -= 1;
      
  //         if (item.quantity <= 0) {//remove the item if quantity goes 0
  //         cart.items = cart.items.filter(
  //           (item) => item.product.toString() !== productId);
  //         }
  //      }
  //     await cart.save();
  //     return res.status(200).json({ message: "Cart updated" });
  //   }
  //   res.redirect("/cart");
  // } catch (err) {
  //     console.error("Error updating cart:", err);
  //     res.status(500).send("Failed to update cart.")
  //   }
});


module.exports = router;