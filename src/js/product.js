import { getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails from "./productDetails.mjs";
import { addProductToCart } from "./productDetails.mjs";
import { setSuperscript } from "./utils.mjs";
const productId = getParam("product");
const addToCartButton = document.getElementById("addToCart");
productDetails(productId);
setSuperscript();

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  location.reload()

}

// add listener to Add to Cart button

addToCartButton.addEventListener("click", addToCartHandler);

// update the superscript on cart icon

