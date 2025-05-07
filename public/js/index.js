
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
let btn2 = document.getElementById("sinin");

btn2.addEventListener("click", ()=> {
   let url = "http://localhost:8080/signin";
   // console.log("button was clicked");
   Signin(url);
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

// // // Add to cart
// let cart = document.querySelectorAll(".cart");
// cart.forEach(addCart => {
//   addCart.addEventListener("click", (e) => {
//    e.preventDefault();
//    console.log("cart clicked");
  
// })
// });