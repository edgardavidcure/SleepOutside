import { findProductById } from "./productData.mjs"
import { setLocalStorage } from "./utils.mjs";
let products = [];



export default async function productDetails(productId){
  const product = await findProductById(productId);
  renderProductDetails(product)
}

export async function addProductToCart(product) {
  if(localStorage.getItem("so-cart")){
        products = JSON.parse(localStorage.getItem("so-cart"));
    }
  products.push(product);
  setLocalStorage("so-cart", products);

  
}


function renderProductDetails(product){
  document.getElementById("productName").innerHTML = product.Name;
  document.getElementById("productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
  document.getElementById("productImage").setAttribute("src", product.Image);
  document.getElementById("productFinalPrice").innerHTML = `$${product.FinalPrice}`;
  document.getElementById("productColorName").innerHTML = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id",product.Id);

  
}


