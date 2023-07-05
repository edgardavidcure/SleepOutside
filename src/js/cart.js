import { getLocalStorage, setLocalStorage, loadHeaderFooter, calculateTotal, setSuperscript, capitalize} from "./utils.mjs";
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
  cartContent.splice(idToDelete, 1);
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

    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        onDelete(index);
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
    <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="../product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.SelectedColor}</p>
    <div class="cart-card__quantity">
      <button class="subtractQuantity" data-index="${index}">-</button>
      <p>Qty: ${item.totalInCart}</p>
      <button class="addQuantity" data-index="${index}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="cart-delete" data-id="${item.Id}">X</span>
  </li>`;
}

function wishlistTemplate(item){
  return `<li class="wish-card">
    <a href="../product_pages/index.html?product=${item.Id}" class="wishlistLink">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}">
      <h5>${item.NameWithoutBrand}</h5>
      <h6>${item.Brand.Name}</h6>
      <p>$${item.FinalPrice}</p>
    </a>
  </li>`
}

function renderWishContents() {

  const wishlistItems = getLocalStorage("so-wishlist");
  const productList = document.querySelector(".wishlist");
  const wishlistSection = document.querySelector(".wishlistSection")
  if (wishlistItems && wishlistItems.length > 0) {
    wishlistSection.style.display = "block"

    const htmlItems = wishlistItems.map((item) => wishlistTemplate(item));
    productList.innerHTML = htmlItems.join("");

  } else {
    productList.innerHTML = "<p>The cart is empty<span style='font-size:25px;'>&#128549;</span></p>";
    renderCartTotal(0);
    
  }

}
loadHeaderFooter();
renderCartContents();
renderWishContents();