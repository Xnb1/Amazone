const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    cart: [
    //    {productTitle: {
    //      type: mongoose.Schema.Types.Title, ref: "Product"}
    //    },
       {productId: {
         type: mongoose.Schema.Types.ObjectId, ref: "Product"}
       },
       {productQuantity:
        { type: Number }
       }
        
    ]
})

const User = new model ( "User" ,userSchema);

module.exports = User;