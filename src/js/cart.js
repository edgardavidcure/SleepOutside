import { getLocalStorage, setLocalStorage, loadHeaderFooter, calculateTotal, setSuperscript} from "./utils.mjs";
const cartItems = getLocalStorage("so-cart");
const cartSection = document.querySelector(".cart-footer");
const cartTotalElement = document.querySelector(".cart-total");



let cartTotal;
function subtractQuantity(index) {
  const cartContent = getLocalStorage("so-cart");
  cartContent[index].totalInCart -= 1; // Subtract 1 from quantity

  if (cartContent[index].totalInCart < 1) {
    // Remove item from cart if quantity becomes zero or negative
    cartContent.splice(index, 1);
  }

  setLocalStorage("so-cart", cartContent);
  renderCartContents();
}

function addQuantity(index) {
  const cartContent = getLocalStorage("so-cart");
  cartContent[index].totalInCart += 1; // Add 1 to quantity

  setLocalStorage("so-cart", cartContent);
  renderCartContents();
}

function renderCartTotal(cartTotal) {
  console.log(cartTotal)
  if (cartTotal == 0){
    cartSection.style.display = "none";
    cartSection.classList.remove("show");
  }else{
    cartTotalElement.innerHTML = `Total: <span>$${cartTotal}</span>`;
    cartSection.classList.add("show");
    cartSection.classList.remove("hide");
  }
  
  loadHeaderFooter();

}

function onDelete(idToDelete) {
  let cartContent = getLocalStorage("so-cart");
  let findItemIndex = cartContent.findIndex((item) => item.Id == idToDelete);
  cartContent.splice(findItemIndex, 1);
  setLocalStorage("so-cart", cartContent);
  renderCartContents();

}

function renderCartContents() {

  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    productList.innerHTML = htmlItems.join("");
    const deleteButtons = document.querySelectorAll(".cart-delete");
    const subtractButtons = document.querySelectorAll(".subtractQuantity");
    const addButtons = document.querySelectorAll(".addQuantity");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const dataId = button.getAttribute("data-id");
        onDelete(dataId);
      });
    });

    subtractButtons.forEach((button, index) => {
      button.addEventListener("click", () => subtractQuantity(index));
    });

    addButtons.forEach((button, index) => {
      button.addEventListener("click", () => addQuantity(index));
    });

    const cartTotal = calculateTotal(cartItems);
    renderCartTotal(cartTotal);
  } else {
    productList.innerHTML = "<p>The cart is empty<span style='font-size:25px;'>&#128549;</span></p>";
    renderCartTotal(0);
    
  }

}

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button class="subtractQuantity" data-index="${index}">-</button>
      <p>Qty: ${item.totalInCart}</p>
      <button class="addQuantity" data-index="${index}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="cart-delete" data-id="${item.Id}">X</span>
  </li>`;
}

loadHeaderFooter();
renderCartContents();