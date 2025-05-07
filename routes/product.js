const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware.js");
const Product = require("../models/product.js");

router.get("/view", isLoggedIn, async (req,res) => {
    try { 
        const Prodct = await Product.find();
        
        res.render("view.ejs", { Prodct, user: req.user });
        // console.log(req.user);
    } catch (err) {
        console.log(err, "Error fetching the products");
    }
});




module.exports = router;