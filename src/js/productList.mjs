import { getProductsByCategory } from "./externalServices.mjs";
import {
  discount,
  renderListWithTemplate,
  capitalize,
  getLocalStorage,
} from "./utils.mjs";
import Alert from "./alerts.js";
import productDetails from "./productDetails.mjs";

export default async function productList(selector, category, search, sort) {
  document.getElementById("categoryName").innerHTML = capitalize(`${category}`);
  let alert = new Alert();
  console.log(alert.alertsHTml);
  document.getElementById("alert-list").innerHTML = await alert.alertsHTml();
  let products = await getProductsByCategory(category);

  if (sort) {
    if (sort === "Name") {
      products.sort((a, b) => {
        let fa = a.NameWithoutBrand.toLowerCase(),
          fb = b.NameWithoutBrand.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      console.table(products);
    } else if (sort == "Price") {
      products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
  }

  function checkInput(input) {
    if (input.value !== "") {
      input.classList.add("active");
    } else {
      input.classList.remove("active");
    }
  }

  const inputElement = document.getElementById("searchBar");

  inputElement.addEventListener("input", function () {
    checkInput(this);
  });

  breadcrumb(category, products.length);

  if (search && search != "") {
    products = products.filter((item) =>
      item.Name.toUpperCase().includes(search.toUpperCase())
    );
  }

  renderListWithTemplate(renderProductCard, selector, products);
  updateIconColor();
}

function renderProductCard(item) {
  const newItem = `
    <li class="product-card">
    <a href="../product_pages/index.html?product=${item.Id}">
    <span class="discount">${discount(
      item.SuggestedRetailPrice,
      item.FinalPrice
    )}%</span>
    <picture>
    <source media="(max-width:500px)" srcset="${item.Images.PrimarySmall}">
    <source media="(min-width:500px)" srcset="${item.Images.PrimaryMedium}">
    <img
    alt="${item.Name}"
    />
    </picture>
    <h3 class="card__brand">${item.Brand.Name}</h3>
    <h2 class="card__name">${item.NameWithoutBrand}</h2>
    <p class="product-card__price slashed">$ ${
      item.SuggestedRetailPrice !== item.FinalPrice
        ? item.SuggestedRetailPrice.toFixed(2)
        : ""
    }</p>
    <p class="product-card__price">$ ${item.FinalPrice}</p>
    <i class="fa fa-eye" id="${item.Id}" title="Quick Lookup"></i>
    <i class="fa-regular fa-heart" style="color: #ff2600;" id="${
      item.Id
    }" title="Add product to wishlist"></i>
    </a>
  </li>
    `;
  return newItem;
}

function breadcrumb(type, qty) {
  const category = document.getElementById("category_bread");
  const qtyItem = document.getElementById("totalQTY");
  category.innerHTML = capitalize(type);
  qtyItem.innerHTML = `${qty} items`;
}

function updateIconColor() {
  const wishlistItems = getLocalStorage("so-wishlist") || [];
  const heartIcons = Array.from(document.getElementsByClassName("fa-heart"));

  heartIcons.forEach((icon) => {
    const id = icon.id;

    const isWishlisted = wishlistItems.some(
      (item) => item.Id === id && item.wished
    );

    if (isWishlisted) {
      icon.classList.add("fa-solid");
    } else {
      icon.classList.remove("fa-solid");
    }
  });
}
