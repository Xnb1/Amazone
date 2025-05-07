const mongoose  = require("mongoose");
const User = require("./user.js");
const Product = require("./product.js");


// const cartSchema = new mongoose.Schema ({
//   user : {
    
//       ref: User,              // reference to User model
//       type: String,
//       required: true
    
//   },
//   items: [{
//     product : {
//       ref: Product,          // reference to Product model
//       type: String,
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1
//     }
//   }]
// });


const cartSchema = new mongoose.Schema({
     user : {                                                                        
       type: mongoose.Schema.Types.ObjectId,
       ref : User,      // reference to User model
       required: true
    },
    items: [{
      product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Product,      // reference to Product model
        required : true
      },
      quantity : {
        type: Number,
        required: true,
        min : 1
      }
    }]   
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;



