
let slideBar = document.getElementById("slidebar");
let btn = document.getElementById("btn-close");
let allBtn = document.getElementById("home"); 

function ClickButton() {
    slideBar.style.left = "-390px";
    slideBar.style.transitionDuration = "0.8s";
    btn.style.display = "none";
}
 
document.addEventListener('DOMContentLoaded', function() {
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


// Sign In/Login Button
let btn2 = document.getElementById("sinin");

btn2.addEventListener("click", ()=> {
   let url = "http://127.0.0.1:8080/signin";
   console.log("button was clicked");
   Signin(url);
});

let btn3 = document.getElementsByClassName("login")[0];

btn3.addEventListener("click", () => {
   url = "http://127.0.0.1:8080/signin";
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