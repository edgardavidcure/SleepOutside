import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";
const productsList = document.querySelector(".product-list");
const category = getParam("type")
const closeBtn = document.querySelector(".close");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modalContent");
productList(productsList, category);
loadHeaderFooter();



productsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-eye")) {
    const id = event.target.classList[2]
    console.log(id)
    event.preventDefault();
    
    }});
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });