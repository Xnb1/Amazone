const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user.js");
const Cart = require("../models/cart.js");

router.get("/signin", (req,res) => {
    res.render("signin");
});

router.get("/new", (req,res) => {
    res.render("new.ejs");
});

//creating account
router.post("/new", async (req,res) => {
    try {
     let { name, email, password } = req.body;
     let user = new User({name, email, password});
      await user.save();
      res.redirect("/signin");

    } catch (err) {
        console.log(err);
    }
});

//signin in
router.post("/signin", async (req, res) => {
    try {
        
       let { email, password } = req.body;                          
       
       const user = await User.findOne({email, password});
       if (!user) {
        return res.send("Invalid email or password. Please try again");
       }
       req.session.user = user;
    //     req.session.user = {
    //        _id: user._id,
    //        name: user.name,
    //   };

       //Checking guest session cart
       if (req.session.cart && req.session.cart.length > 0) {
         let cart = await Cart.findOne({user: user._id});

           if (!cart) {
             cart = new Cart({user: user._id, items: []});
           }
       
        
          //Add or merge items (existing items(without login) and session items(with login))
          for (let sessionItem of req.session.cart) {
            const existingItem = cart.items.find((item) => item.product.toString() === sessionItem.product)
              
              if (existingItem) {
               existingItem.quantity += sessionItem.quantity;
              } else {
               cart.items.push({
                product : sessionItem.product,
                quantity : sessionItem.quantity
               }) 
              }
           }
           await cart.save();

           //clear session cart
           req.session.cart = [];
       }
       res.redirect("/view");     
    } catch (err) {
        console.log(err)
    }
});

router.get("/logout", (req, res) => {
   req.session.destroy(() => {
      res.redirect("/signin");
   });
});

module.exports = router;

