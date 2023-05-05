import { getLocalStorage } from "./utils.mjs";
const cartItems = getLocalStorage("so-cart");
const cartSection = document.querySelector(".cart-footer");
const cartTotalElement = document.querySelector(".cart-total");


let cartTotal = 0
function renderCartContents() {
  if(cartItems){
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    calculateTotal();
    renderCartTotal();
  }else{
    document.querySelector(".product-list").innerHTML = "<p>The cart is empty<span style='font-size:25px;'>&#128549;</span></p>"
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateTotal(){
  let cartItemsPrices = [];
  cartItems.forEach(item => {
    cartItemsPrices.push(item.FinalPrice)
  });
  cartTotal = cartItemsPrices.reduce((a, b) => (a + b), 0);
}
function renderCartTotal(){
  cartTotalElement.innerHTML = `Total: <span>$${cartTotal}</span`;
  cartSection.classList.add("show")
  cartSection.classList.remove("hide")
}
renderCartContents();
