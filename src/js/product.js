import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
let products = [];
console.log(products)

function addProductToCart(product) {
  if(localStorage.getItem("so-cart")){
		products = JSON.parse(localStorage.getItem("so-cart"));
	}
  products.push(product);
  setLocalStorage("so-cart", products);

  
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);

}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
