import {
  addProductReview,
  findProductById,
  getProductsByCategory,
  getReviewsByProductId,
} from "./externalServices.mjs";
import {
  discount,
  getLocalStorage,
  getParam,
  renderListWithTemplate,
  setLocalStorage,
  capitalize,
  formatDate,
  getUserInfo,
} from "./utils.mjs";

export default async function productDetails(productId) {
  const product = await findProductById(productId);
  if (product) {
    renderProductDetails(product);
  } else {
    renderProductNotFound();
  }
}

export async function addProductToCart(product) {
  product.SelectedColor = getLocalStorage("color");
  let products = [];

  const cart = getLocalStorage("so-cart");
  // get any item in local storage and add to products array
  let idsArray = [];
  // add the ids of each product to the idsArray
  if (cart != null) {
    products = cart;

    cart.forEach((cartItem) => {
      idsArray.push(cartItem.Id);
    });
  }
  // set a new property to calculate how many items are in the cart with a default of 1
  product.totalInCart = 1;
  if (idsArray.includes(product.Id)) {
    products.forEach((cartProduct) => {
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

  setLocalStorage("so-cart", products);
}

export function renderProductDetails(product) {
  document.getElementById("productName").innerHTML = product.Name;
  document.getElementById("productNameWithoutBrand").innerHTML =
    product.NameWithoutBrand;
  const mainImage = document.querySelectorAll(".productImage");
  mainImage.forEach((element) => {
    element.setAttribute("src", product.Images.PrimaryLarge);
  });
  getCarouselImages();
  document.getElementById(
    "productFinalPrice"
  ).innerHTML = `$${product.FinalPrice}`;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id", product.Id);

  if (product.SuggestedRetailPrice != product.FinalPrice) {
    const discountSpan = document.getElementById("discount");
    discountSpan.setAttribute("class", "discount");
    discountSpan.innerHTML = discount(
      product.SuggestedRetailPrice,
      product.FinalPrice
    );
    document.getElementById(
      "productSuggestedPrice"
    ).innerHTML = `$${product.SuggestedRetailPrice.toFixed(2)}`;
  }
  if (product.Colors && product.Colors.length > 1) {
    renderColorOptions(product.Colors);
  } else {
    setLocalStorage("color", product.Colors[0].ColorName);
    document.getElementById("colorsToselect").style.display = "none";
  }
}

function renderColorOptions(colors) {
  const colorContainer = document.getElementById("productColorOptions");
  colorContainer.innerHTML = "";

  colors.map((color, index) => {
    const colorOption = document.createElement("div");
    colorOption.classList.add("colorOption");
    colorOption.setAttribute("data-color", color.ColorName);
    colorOption.setAttribute("onclick", "selectColorOption(this)");
    if (index == 0) {
      colorOption.classList.add("selected");
      setLocalStorage("color", color.ColorName);
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

window.selectColorOption = function (element) {
  const selectedColor = element.getAttribute("data-color");

  // Remove the border from all color options
  const colorOptions = document.getElementsByClassName("colorOption");
  for (let i = 0; i < colorOptions.length; i++) {
    colorOptions[i].classList.remove("selected");
  }

  // Add the border to the selected color option
  element.classList.add("selected");
  setLocalStorage("color", selectedColor);
  // Do something with the selected color (e.g., update product image, apply color filter, etc.)
};

export function renderProductNotFound() {
  const productSection = document.querySelector(".product-detail");
  productSection.innerHTML = "";
  let notFoundDetails = `<h3 id='productName'></h3>
    <h2 class='divider' id='productNameWithoutBrand'>Product Not Found</h2>
    <p class='product__description' id='productDescriptionHtmlSimple'>Please Check Our Product List Again</p>
    <p style="margin-top: 2rem;"><a class='gobackButton' href='../index.html'>Go Back To Main Menu</a></p>`;
  productSection.insertAdjacentHTML("afterbegin", notFoundDetails);
}

export async function renderReviews(productId) {
  let comments = await getReviewsByProductId(productId);
  const reviewsSection = document.getElementById("productReviews");
  if (comments && comments.length > 0) {
    const section = comments.map((comment) => renderProductReviews(comment));
    reviewsSection.insertAdjacentHTML("beforeend", section.join(""));
  } else {
    reviewsSection.insertAdjacentHTML("beforeend", "<p>No reviews to show</p>");
  }
}

// export async function addComment(formData) {
//   const data = await addProductReview(formData);
//   return data;
// }

export async function getCarouselImages() {
  const id = await getParam("product");
  const carouselParentElement = document.querySelector(".row");
  const slideParentElement = document.querySelector("#slidesContainer");
  const productData = await findProductById(id);
  const extraImages = productData.Images.ExtraImages;
  if (extraImages) {
    renderListWithTemplate(
      renderCarouselImage,
      carouselParentElement,
      extraImages,
      "beforeend",
      false
    );
    renderListWithTemplate(
      renderSlideImage,
      slideParentElement,
      extraImages,
      "beforeend",
      false
    );
  }
  showSlides(slideIndex);
  const images = document.querySelectorAll(".demo");
  images.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentSlide(index + 1);
    });
  });
}

export function renderCarouselImage(data, index) {
  const newImage = `<div class="column">
      <img class="demo cursor" src="${data.Src}" alt="${data.Title}" id="${index}" style="width:100%" alt="The Woods">
    </div>`;
  return newImage;
}

export function renderSlideImage(data) {
  const newImage = `<div class="mySlides">
      <img src="${data.Src}" style="width:100%" alt="${data.Title}" class="divider">
    </div>`;
  return newImage;
}

let slideIndex = 1;

export function plusSlides(n) {
  showSlides((slideIndex += n));
}

export function currentSlide(n) {
  showSlides((slideIndex = n));
}

export function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.querySelectorAll(".demo");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";

  dots[slideIndex - 1].classList.add("active");
}

export function renderProductReviews(data) {
  const stars = renderStars(data.rating);
  return `<article class="productReview">
  <img class="review-profilePic" src="${data.user.profilePic}" alt="${
    data.user.firstName
  } Profile Picture">
  <div class="review-details">
  <div class="star-rating">${stars}</div>
    <p class="review-text">${capitalize(data.review)}</p>
    <p class="user-name">Written by: <span class="bold">${
      data.user.displayName
    }</span></p>
    <p class="review-date">On ${formatDate(data.createdAt)}</p>
  </div>
</article><hr/>`;
}

export function renderStars(rating) {
  const starCount = 5;
  const fullStars = Math.floor(rating);
  console.log(rating);
  let stars = `<i class="fa-solid fa-star"></i>`.repeat(fullStars);

  stars += `<i class="empty-star fa-regular fa-star"></i>`.repeat(
    starCount - Math.ceil(rating)
  );

  return stars;
}

export function displayReviewsForm() {
  const user = getUserInfo();
  const reviewsForm = document.querySelector(".reviewsForm");
  const loginUrl = import.meta.env.VITE_REVIEWSAPI_URL + "/google";
  if (user) {
    reviewsForm.style.display = "flex";
    const form = `<h3 class="left-align">Review your product</h3>
    <form id="commentForm" class="newCommentForm" action="">
      <input id="productId" type="text" name="productId" hidden />
      <input id="userId" type="text" name="userId" hidden />
      <label for="rating" class="bold">Overall rating*</label>
      <select name="rating" id="rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label for="review" class="bold">Your review*</label>
      <textarea
        name="review"
        id="review"
        placeholder="Add your review here!"
        cols="50"
        rows="5"
      ></textarea>
      <button type="submit" class="commentButton">Add Review</button>
    </form>`;
    reviewsForm.insertAdjacentHTML("beforeend", form);
  } else {
    reviewsForm.innerHTML = "";
    const loginPrompt = `<a href="${loginUrl}">Login with Google</a> to add a product review`;
    reviewsForm.insertAdjacentHTML("beforeend", loginPrompt);
    reviewsForm.style.display = "block";
  }
}
