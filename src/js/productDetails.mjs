import { findProductById, getProductsByCategory } from "./externalServices.mjs"
import { discount, getLocalStorage, getParam, renderListWithTemplate, setLocalStorage } from "./utils.mjs";



export default async function productDetails(productId){
  const product = await findProductById(productId);
  if (product){
    renderProductDetails(product)
  } else {
    renderProductNotFound();
  }
}

export async function addProductToCart(product) {
  let products = [];

  const cart = getLocalStorage("so-cart");
  // get any item in local storage and add to products array
  let idsArray = [];
  // add the ids of each product to the idsArray
  if(cart != null){
    products = cart;

    cart.forEach(cartItem => {
      idsArray.push(cartItem.Id)
    });
  } 
  // set a new property to calculate how many items are in the cart with a default of 1
  product.totalInCart = 1
  if(idsArray.includes(product.Id)){
        for (let cartProduct of products){
          //count how many repeated products are in the cart
          let count = cartProduct.totalInCart
          //if Ids are the same, add 1 to the total and update the total in the array
          if (cartProduct.Id === product.Id){
            count++;
            cartProduct.totalInCart = count
          } 
        }
      

    } else {
      //if the item is not in the cart already, add it
      products.push(product);

    }
  setLocalStorage("so-cart", products);

  
}




export function renderProductDetails(product){
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

export function renderProductNotFound(){
  const productSection = document.querySelector(".product-detail");
  productSection.innerHTML = "";
  let notFoundDetails = `<h3 id='productName'></h3>
    <h2 class='divider' id='productNameWithoutBrand'>Product Not Found</h2>
    <p class='product__description' id='productDescriptionHtmlSimple'>Please Check Our Product List Again</p>
    <p style="margin-top: 2rem;"><a class='gobackButton' href='../index.html'>Go Back To Main Menu</a></p>`;
  productSection.insertAdjacentHTML("afterbegin", notFoundDetails);


}


