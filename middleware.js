const session = require("express-session");

function isLoggedIn (req,res, next) {
   if (req.session.user) {
      req.user = req.session.user ;
   } else {
    req.user = null;
   }
   next()
}

module.exports = isLoggedIn;