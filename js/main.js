/* 
================================================== 
   Essa parte ficou para o CSS
================================================== 
*/

const nav = document.querySelector(".nav-custom");
const navOffset = nav.offsetTop;

window.addEventListener("scroll", () => {
  if (window.scrollY > navOffset) {
    nav.classList.add("fixed");
  } else {
    nav.classList.remove("fixed");
  }
});