const mongoose  = require("mongoose");


const productSchema = new mongoose.Schema ({
     
    title : {
        type: String,
        required: true
    },
    image: {
      type: String,
      required: true,
      // default: "/myassets/404.png",
    },
     price: {
        type: Number,
        required: true,
        min : 0,
     },
     rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
     },
     quantity: {
      type: Number
     }
});

const Product = mongoose.model("Product", productSchema, "products");



module.exports = Product;