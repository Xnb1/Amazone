let slideBar = document.getElementById("slidebar");
let btn = document.getElementById("btn-close");
let allBtn = document.getElementById("home"); 

function ClickButton() {
    slideBar.style.left = "-390px";
    slideBar.style.transitionDuration = "0.8s";
    btn.style.display = "none";
}
 
document.addEventListener('DOMContentLoaded', function() { //ensures that script runs only if DOMContents are loaded
   if (btn) {
   btn.addEventListener("click", ClickButton);  
}
});

allBtn.addEventListener("click", function() {
   if (all) {
   slideBar.style.left = "0px";
   btn.style.display = "inline";
   slideBar.style.transitionDuration = "0.8s";
   }
});

//home page
document.addEventListener("DOMContentLoaded", () => {
   let home = document.querySelectorAll(".amz");     //Also node list
   if (home) {
      home.forEach(hom => { 
         hom.addEventListener("click", async () => {
            console.log("div clicked");
            try {
               const url = "http://localhost:8080/";
               const res = await axios.get(url);
               if (res) 
               window.location.href = url; 
            } catch (err) {
            console.error(err);
            }
        });
         
      })
   }   
});
      
   
// Sign In/Login Button
document.addEventListener("DOMContentLoaded", ()=> {
  let btn2 = document.getElementById("sinin");
  if (btn2) {
    btn2.addEventListener("click", async ()=> {
       console.log("button was clicked");
       try {
          let url = "http://localhost:8080/signin";
   
           await Signin(url);
         }   catch (err) {
               console.log(err);
         }
      });
   }
});

let btn3 = document.getElementsByClassName("login")[0];

btn3.addEventListener("click", () => {
   console.log(btn3);
   url = "http://localhost:8080/signin";
   console.log("button was clicked");
   Signin(url);
});
   
async function Signin(url) {
   try {
      let res = await axios.get(url);
      if (res) {
       window.location.href = url; 
      }
    } catch (err){
       console.log(err);
    }
}


// cart button
let cart = document.getElementsByClassName("cart")[0];  //as it is html collection returns array
cart.addEventListener("click", () => {
   
   if (window.isLoggedIn) {
      window.location.href = "/cart";
   } else {
      alert ("You are not logged in. Please login first");
   }
});

//display product page
let divs = document.querySelectorAll("#sub_container");

divs.forEach(div => {               // querySelectorAll returns a nodeList (which is similar to array) so i loop through each element using forEach
  div.addEventListener("click", () => {
    url = "http://localhost:8080/view";
    console.log("button was clicked");
    ViewPage(url);
})
});

async function ViewPage(url) {
   try {
      let res = await axios.get(url);
      if (res) {
         window.location.href = url; 
        }
      } catch (err){
         console.log(err);

   }
}



document.addEventListener("DOMContentLoaded", () => {
  const updateQuantity = async (productId, action) => {
    try {
      let url = "http://localhost:8080/cart/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, action })
      });
      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      console.log("Cart updated", data);
      location.reload(); // reload page to show updated quantity
    } catch (err) {
      console.error("Cart update error:", err);
    }
  };

 

  let decrementBtn = document.querySelectorAll(".decrement");
   if (decrementBtn) {
     decrementBtn.forEach(dec => {
       dec.addEventListener("click", () => {
         const productId = dec.dataset.productId;
         updateQuantity (productId, "decrease");
       });  
     });
    }
  
  let incrementBtn = document.querySelectorAll(".increment");
  if (incrementBtn) {
     incrementBtn.forEach(inc => {
       inc.addEventListener("click", () => {
         const productId = inc.dataset.productId;
         updateQuantity (productId, "increase");
         
         });  
     });
    }
});

// home page
// 1. click --> product page 
// if user logged in --> product page welcome user

// 2. add to cart button click --> added to cart
// if user logged in --> with user id, added to cart

