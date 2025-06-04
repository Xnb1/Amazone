const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.js");
const Product = require("../models/product.js");
const isLoggedIn = require("../middleware.js");
const Prodct = require("./product.js");
const user = require("./user.js");

//Get cart items
router.get("/cart", async (req, res) => {
  try {
    if (req.session.user) {                        //if user is login, fetching from db
      const userId = req.session.user?._id;
      let cart = await Cart.findOne({ user: userId }).populate("items.product");
      if (!cart) {
           cart = { items: [] };
      }
      const fullCart = [];
      
      for (let item of cart?.items || []) {
      fullCart.push({ product: item.product, quantity: item.quantity });
      }
      
      return res.render("cart.ejs", { cart: {items: fullCart } });
    } else {
    
      //for Guest user
      const cartItems = req.session.cart || [];
     const fullCart = [];
     
     
     //fetch product details from db using IDs
     for (let item of cartItems) {
      const product = await Product.findById(item.product);
      
      if (product) {
        fullCart.push({product, quantity: item.quantity});
      }
     }

      res.render("cart.ejs", { cart: {items: fullCart} });
    }
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).send("Failed to load cart.");
  }
});


//add product to cart, check item exists(if yes update quantity, if not add the item)
router.post("/cart", async (req, res) => {
    let { product, quantity} = req.body;
    quantity = parseInt(quantity);
    
    try {
      //if user is logged in
        if (req.session.user) {
          const userId = req.session.user._id;

          let cart = await Cart.findOne({user: userId});
          if (!cart) {
            cart = new Cart({user: userId, items: []});
          }

          const existingItem = cart.items.find((item) => item.product.toString() === product);
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            cart.items.push({product, quantity});
          }
          await cart.save();
          console.log("cart saved to db for logged in user");
        
        } else {
          
          //if user is not logged in
            if (!req.session.cart) {
               req.session.cart = [];
             }
  
           //check if item exists in the cart
          const existingItem = req.session.cart.find((item) => item.product === product);
          
          if (existingItem) {
              existingItem.quantity += (quantity);      //update quantity
          } else {
              req.session.cart.push({product, quantity })  //add new product
          }
          console.log("cart saved to session for guest"); 
        }
    
       res.redirect("/cart");
    } catch (err) {
        console.log("Error adding to cart", err);
        res.status(500).send("Something went wrong");
    }
});



router.post("/cart/update", async(req, res) => {
  const {productId, action} = req.body;
  

  try {
    // for login user
    if (req.session.user) {
      const userId = req.session.user._id;
      const cart = await Cart.findOne( {user: userId} );
       if (!cart) {
         return res.status(404).json({ message: "Cart not found" });
        }

      const itemIndex = cart.items.findIndex((item => item.product.toString() === productId));
      if (itemIndex === -1) return res.status(404).send("Item not found");

      const item = cart.items[itemIndex];

       if (action === "increase") {
         item.quantity += 1;
        } else if (action === "decrease") {
          item.quantity -= 1;
           if (item.quantity <= 0) { 
             cart.items.splice(itemIndex, 1);
            }
          }

      await cart.save();
      res.redirect("/cart");
    } else {
      //guest user (session cart)

      const cart = req.session.cart;
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

       const item = cart.find(item => item.product === productId);
      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

       if (action === "increase") {
        item.quantity += 1;
      } else if (action === "decrease") {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          const idx = cart.indexOf(item);
          cart.splice(idx, 1);
        }
      }
      if (cart.length === 0) {
        req.session.cart = [];
      }
      res.redirect("/cart");
    }

  } catch (err) {
    console.error("Cart update error:", err);
    res.status(500).json({ message: "Internal error" });
  }
    
});


module.exports = router;