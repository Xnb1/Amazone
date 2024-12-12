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



let btn3 = document.getElementsByClassName("login")[0]; //0th element of nodelist or html collection

btn3.addEventListener("click", () => {
   console.log(btn3);
   url = "http://localhost:8080/signin";
   // console.log("button was clicked");
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

//home page
document.addEventListener("DOMContentLoaded", () => {
   let home = document.querySelectorAll(".amz");      //Also node list
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