import { getLocalStorage, setLocalStorage, loadHeaderFooter, setSuperscript} from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
const cartItems = getLocalStorage("so-cart");
const cartSection = document.querySelector(".cart-footer");
const cartTotalElement = document.querySelector(".cart-total");

let cartTotal = 0;



function calculateTotal(){
  let cartItemsPrices = [];
  cartItems.forEach(item => {
    cartItemsPrices.push(item.FinalPrice)
  });
  cartTotal = (cartItemsPrices.reduce((a, b) => (a + b), 0)).toFixed(2);
}
function renderCartTotal(){
  cartTotalElement.innerHTML = `Total: <span>$${cartTotal}</span`;
  cartSection.classList.add("show")
  cartSection.classList.remove("hide")
}

function onDelete(idToDelete){
  let cartContent = getLocalStorage("so-cart");
  let findItemIndex = cartContent.findIndex(item => item.Id == idToDelete);
  cartContent.splice(findItemIndex,1)
  setLocalStorage("so-cart", cartContent);
  location.reload()

}

function renderCartContents() {
  if(cartItems && cartItems.length > 0){
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item,index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    for(let i = 0; i < cartItems.length; i++){
      const dataId = document.querySelector(`#item-${i}`);
      document.querySelector(`#item-${i}`).addEventListener("click",() => onDelete(`${dataId.getAttribute("data-id")}`));
    }
    calculateTotal();
    renderCartTotal();
  }else{
    document.querySelector(".product-list").innerHTML = "<p>The cart is empty<span style='font-size:25px;'>&#128549;</span></p>"
  }
}

function cartItemTemplate(item,index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-delete" data-id="${item.Id}" id="item-${index}">X</span>
</li>`;

  return newItem;
}





loadHeaderFooter();
//shoppingCart();
renderCartContents();