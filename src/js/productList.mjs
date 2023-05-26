import { getData } from "./productData.mjs";
import { discount, renderListWithTemplate,capitalize } from "./utils.mjs";
import Alert from "./alerts.js";

export default async function productList(selector, category) {
  document.getElementById("categoryName").innerHTML = capitalize(`${category}`);
  let alert = new Alert
  document.getElementById("alert-list").innerHTML = await alert.alertsHTml();
  let products = await getData(category);

  if (category == "tents") {
    products = products.filter(
      (item) => item.Id != "989CG" && item.Id != "880RT"
    );
  }
  renderListWithTemplate(renderProductCard, selector, products);
}

function renderProductCard(item) {
  const newItem = `
    <li class="product-card">
    <a href="../product_pages/index.html?product=${item.Id}">
    <span class="discount">${discount(item.SuggestedRetailPrice,item.FinalPrice)}%</span>
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
    <h3 class="card__brand">${item.Brand.Name}</h3>
    <h2 class="card__name">${item.NameWithoutBrand}</h2>
    <p class="product-card__price slashed">$ ${item.SuggestedRetailPrice !== item.FinalPrice ? (item.SuggestedRetailPrice).toFixed(2) : ""}</p>
    <p class="product-card__price">$ ${item.FinalPrice}</p>
    </a>
  </li>
    `;
  return newItem;
}


