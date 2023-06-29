import { findProductById } from "./externalServices.mjs"
import { discount, getLocalStorage, setLocalStorage } from "./utils.mjs";



export default async function productDetails(productId){
  const product = await findProductById(productId);
  if (product){
    renderProductDetails(product);
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


function renderProductDetails(product){
  document.getElementById("productName").innerHTML = product.Name;
  document.getElementById("productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
  document.getElementById("productImage").setAttribute("src", product.Images.PrimaryLarge);
  document.getElementById("productFinalPrice").innerHTML = `$${product.FinalPrice}`;
  document.getElementById("productColorName").innerHTML = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id",product.Id);

  renderComments(product.Name)
  
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

function renderComments(productName) {
  let comments = getLocalStorage("comments");

  if (comments) {
    let productComments = comments.filter((item) => item.product === productName);

    if (productComments.length !== 0) {
      const list = document.getElementById("oldComments");
      list.innerHTML = ""; 

      productComments[0].comments.forEach((comment) => {
        const listItem = document.createElement("li");
        listItem.textContent = comment;
        list.appendChild(listItem);
      });
    }
  }
}

export async function addComment(comment, productId) {
  let comments = getLocalStorage("comments");
  const product = await findProductById(productId);

  if (comments) {
    let productComments = comments.find((item) => item.product === product.Name);

    if (productComments) {
      productComments.comments.unshift(comment);
    } else {
      comments.push({
        product: product.Name,
        comments: [comment]
      });
    }
  } else {
    comments = [{
      product: product.Name,
      comments: [comment]
    }];
  }

  setLocalStorage("comments", comments);
  renderComments(product.Name);
  document.getElementById("newComment").value = "";
}


