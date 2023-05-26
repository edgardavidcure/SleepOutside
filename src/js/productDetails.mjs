import { findProductById } from "./productData.mjs"
import { discount, setLocalStorage } from "./utils.mjs";
let products = [];



export default async function productDetails(productId){
  const product = await findProductById(productId);
  if (product){
    renderProductDetails(product)
  } else {
    renderProductNotFound();
  }
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
  document.getElementById("productImage").setAttribute("src", product.Images.PrimaryLarge);
  document.getElementById("productFinalPrice").innerHTML = `$${product.FinalPrice}`;
  document.getElementById("productColorName").innerHTML = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id",product.Id);
  
  if(product.SuggestedRetailPrice != product.FinalPrice){
    const discountSpan = document.getElementById("discount");
    discountSpan.setAttribute("class", "discount");
    discountSpan.innerHTML = discount(product.SuggestedRetailPrice,product.FinalPrice);
    document.getElementById("productSuggestedPrice").innerHTML = `$${(product.SuggestedRetailPrice).toFixed(2)}`;

  }
  
}

function renderProductNotFound(){
  const productSection = document.querySelector(".product-detail");
  productSection.innerHTML = "";
  let notFoundDetails = `<h3 id='productName'></h3>
    <h2 class='divider' id='productNameWithoutBrand'>Product Not Found</h2>
    <p class='product__description' id='productDescriptionHtmlSimple'>Please Check Our Product List Again</p>
    <p style="margin-top: 2rem;"><a class='gobackButton' href='../index.html'>Go Back To Main Menu</a></p>`;
  productSection.insertAdjacentHTML("afterbegin", notFoundDetails);


}


