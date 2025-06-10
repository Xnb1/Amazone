const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware.js");
const Product = require("../models/product.js");

router.get("/view",isLoggedIn, async (req,res) => {
    try { 
        const products = await Product.find();
        console.log("fetching products", products);
        const user = req.user;
        if (isLoggedIn) {
           res.render("view.ejs", { products, user });
        } else {
            res.render("view.ejs", { products })
        }

    } catch (err) {
        console.log(err, "Error fetching the products");
    }
});



module.exports = router;