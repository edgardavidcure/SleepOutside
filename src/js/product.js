import { addProductReview, findProductById } from "./externalServices.mjs";
import productDetails, {
  displayReviewsForm,
  renderProductReviews,
  renderReviews,
} from "./productDetails.mjs";
import { addProductToCart, plusSlides } from "./productDetails.mjs";
import {
  setSuperscript,
  getParam,
  loadHeaderFooter,
  getUserInfo,
  getCookie,
} from "./utils.mjs";
import Alert from "./alerts";
const productId = getParam("product");
const addToCartButton = document.getElementById("addToCart");
loadHeaderFooter();
productDetails(productId);
loadHeaderFooter();
renderReviews(productId);
displayReviewsForm();
// add to cart button event handler
export async function addToCartHandler(e) {
  const alertInstance = new Alert();
  const alertsHTML = await alertInstance.alertsHTml();
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  setSuperscript();
  document.querySelector(".cart").animate(
    [
      // key frames
      { transform: "translateX(0px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
    ],
    {
      // sync options
      duration: 200,
      iterations: 1,
    }
  );
  const successAlert = {
    message: "Item added to the shopping cart!",
    background: "green",
    color: "white",
  };

  const alertsContainer = document.getElementById("alert-list");
  const successAlertHTML = `<p style="background-color: ${successAlert.background}; color: ${successAlert.color};">${successAlert.message}</p>`;
  alertsContainer.innerHTML = successAlertHTML + alertsHTML;

  alertsContainer.style.animation = "slideIn 0.5s forwards";

  setTimeout(function () {
    alertsContainer.style.animation = "slideOut 0.5s forwards";
    alertsContainer.style.position = "fixed";
  }, 2000);
}

// add listener to Add to Cart button
addToCartButton.addEventListener("click", addToCartHandler);

function loadFormData() {
  const userIdElement = document.getElementById("userId");
  const productIdElement = document.getElementById("productId");

  productIdElement.setAttribute("value", productId);
}
//add listener to Add coment button
const submitReview = document.querySelector(".commentButton");

submitReview.addEventListener("click", async function (e) {
  e.preventDefault();
  const productReviewsForm = document.getElementById("commentForm");
  const token = await getCookie("jwt");
  const formData = new FormData(productReviewsForm);
  formData.append("jwt", token);
  try {
    const result = await addProductReview(formData);
    window.location.reload();
  } catch (error) {
    console.error("Error submitting review:", error);
    // Handle error as needed
  }
});

document.querySelector(".prev").addEventListener("click", function () {
  plusSlides(-1);
});

document.querySelector(".next").addEventListener("click", function () {
  plusSlides(+1);
});
loadFormData();
