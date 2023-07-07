import { findProductById, getProductsByCategory } from "./externalServices.mjs"
import { discount, getLocalStorage, getParam, renderListWithTemplate, setLocalStorage } from "./utils.mjs";



export default async function productDetails(productId){
  const product = await findProductById(productId);
  if (product){
    renderProductDetails(product);
  } else {
    renderProductNotFound();
  }
}

export async function addProductToCart(product) {
  product.SelectedColor = getLocalStorage("color")
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
  if (idsArray.includes(product.Id)) {
    products.forEach(cartProduct => {
      // Contar quantos produtos repetidos existem no carrinho
      let count = cartProduct.totalInCart;
      // Se os IDs forem iguais, adicionar 1 ao total e atualizar o total no objeto
      if (cartProduct.Id === product.Id) {
        if (cartProduct.SelectedColor === product.SelectedColor) {
          count++;
          cartProduct.totalInCart = count;
        } else {
          // Se o produto tiver uma cor diferente, adicioná-lo novamente ao carrinho
          product.totalInCart = 1;
          products.push(product);
        }
      }
    });
  } else {
    // Se o item ainda não estiver no carrinho, adicioná-lo
    product.totalInCart = 1;
    products.push(product);
  }
  
    console.log(products)
  setLocalStorage("so-cart", products);

  
}




export function renderProductDetails(product){
  document.getElementById("productName").innerHTML = product.Name;
  document.getElementById("productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
  const mainImage = document.querySelectorAll(".productImage");
  mainImage.forEach(element => {
    element.setAttribute("src", product.Images.PrimaryLarge)
  });
  getCarouselImages()
  document.getElementById("productFinalPrice").innerHTML = `$${product.FinalPrice}`;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id",product.Id);

  renderComments(product.Name)
  
  if(product.SuggestedRetailPrice != product.FinalPrice){
    const discountSpan = document.getElementById("discount");
    discountSpan.setAttribute("class", "discount");
    discountSpan.innerHTML = discount(product.SuggestedRetailPrice,product.FinalPrice);
    document.getElementById("productSuggestedPrice").innerHTML = `$${(product.SuggestedRetailPrice).toFixed(2)}`;

  }
  if(product.Colors &&  product.Colors.length > 1){
    renderColorOptions(product.Colors)
  }else{
    setLocalStorage("color", product.Colors[0].ColorName)
    document.getElementById("colorsToselect").style.display = "none" 
  }
}


function renderColorOptions(colors) {
  const colorContainer = document.getElementById("productColorOptions");
  colorContainer.innerHTML = "";

  colors.map((color, index)=> {
    const colorOption = document.createElement("div");
    colorOption.classList.add("colorOption");
    colorOption.setAttribute("data-color", color.ColorName);
    colorOption.setAttribute("onclick", "selectColorOption(this)");
    if(index == 0){
      colorOption.classList.add("selected");
      setLocalStorage("color", color.ColorName)
    }
    const swatchImage = document.createElement("img");
    swatchImage.src = color.ColorPreviewImageSrc;
    swatchImage.alt = color.ColorName;

    const imageName = document.createElement("h6");
    imageName.innerHTML = color.ColorName;
    
    colorOption.appendChild(swatchImage);
    colorOption.appendChild(imageName);
    colorContainer.appendChild(colorOption);
  });
}

window.selectColorOption = function(element) {
  const selectedColor = element.getAttribute("data-color");
  
  // Remove the border from all color options
  const colorOptions = document.getElementsByClassName("colorOption");
  for (let i = 0; i < colorOptions.length; i++) {
    colorOptions[i].classList.remove("selected");
  }
  
  // Add the border to the selected color option
  element.classList.add("selected");
  setLocalStorage("color", selectedColor)
  // Do something with the selected color (e.g., update product image, apply color filter, etc.)
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

export async function getCarouselImages(){
  const id = await getParam("product")
  const carouselParentElement = document.querySelector(".row")
  const slideParentElement = document.querySelector("#slidesContainer")
  const productData = await findProductById(id)
  const extraImages = productData.Images.ExtraImages;
  if(extraImages){
    renderListWithTemplate(renderCarouselImage, carouselParentElement, extraImages, "beforeend", false)
    renderListWithTemplate(renderSlideImage, slideParentElement, extraImages, "beforeend", false)
  }
  showSlides(slideIndex)
  const images = document.querySelectorAll(".demo");
    images.forEach((image, index) => {
      image.addEventListener("click", () => {
      currentSlide(index + 1);
    });
  });

}

export function renderCarouselImage(data, index){
  const newImage = 
  `<div class="column">
      <img class="demo cursor" src="${data.Src}" alt="${data.Title}" id="${index}" style="width:100%" alt="The Woods">
    </div>`
  return newImage
}

export function renderSlideImage(data){
  const newImage = 
  `<div class="mySlides">
      <img src="${data.Src}" style="width:100%" alt="${data.Title}" class="divider">
    </div>`
  return newImage
}


let slideIndex = 1;

export function plusSlides(n) {
  showSlides(slideIndex += n);
}

export function currentSlide(n) {
  showSlides(slideIndex = n);
}

export function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.querySelectorAll(".demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";

  dots[slideIndex - 1].classList.add("active")
}

