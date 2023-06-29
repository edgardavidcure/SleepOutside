import { findProductById } from "./externalServices.mjs";
import productDetails from "./productDetails.mjs";
import { addProductToCart} from "./productDetails.mjs";
import { setSuperscript, getParam, loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";
const productId = getParam("product");
const addToCartButton = document.getElementById("addToCart");
loadHeaderFooter();
productDetails(productId);

// add to cart button event handler
export async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  setSuperscript();
  document.querySelector(".cart").animate([
    // key frames
    { transform: "translateX(0px)" },
    { transform: "translateX(-10px)" },
    { transform: "translateX(10px)" }
  ], {
    // sync options
    duration: 200,
    iterations: 1
  });
}

export async function getCarouselImages(){
  const id = await getParam("product")
  const parentElement = document.querySelector(".row")
  const productData = await findProductById(id)
  const extraImages = productData.Images.ExtraImages;
  if(extraImages){
    renderListWithTemplate(renderCarouselIImage, parentElement, extraImages )
  
  }
}

export function renderCarouselIImage(data, index){
  const newImage = 
  `<div class="column">
      <img class="demo cursor" src="${data.Src}" alt="${data.Title}" style="width:100%" onclick="currentSlide(${index})" alt="The Woods">
    </div>`
  return newImage
}






let slideIndex = 1;

// Next/previous controls
export function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
export function currentSlide(n) {
  showSlides(slideIndex = n);
}

export function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName(".demo");
  console.log(dots)
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";

  dots[slideIndex-1].classList.add("active");
}





// add listener to Add to Cart button

addToCartButton.addEventListener("click", addToCartHandler);

// update the superscript on cart icon
document.addEventListener("DOMContentLoaded", function() {

  getCarouselImages();
  showSlides(slideIndex);

})