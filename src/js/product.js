import { findProductById } from "./productData.mjs";
import productDetails from "./productDetails.mjs";
import { addProductToCart } from "./productDetails.mjs";
import { setSuperscript, getParam, loadHeaderFooter } from "./utils.mjs";
const productId = getParam("product");
const addToCartButton = document.getElementById("addToCart");
productDetails(productId);

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  setSuperscript();
  document.querySelector(".cart").animate([
    // key frames
    { transform: 'translateX(0px)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(10px)' }
  ], {
    // sync options
    duration: 200,
    iterations: 1
  });
}

// add listener to Add to Cart button

addToCartButton.addEventListener("click", addToCartHandler);

// update the superscript on cart icon

loadHeaderFooter();