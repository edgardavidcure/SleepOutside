import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default async function productList(selector, category) {
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
    <a href="product_pages/index.html?product=${item.Id}">
    <span class="discount">${discount(item.SuggestedRetailPrice,item.FinalPrice)}%</span>
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
    <h3 class="card__brand">${item.Brand.Name}</h3>
    <h2 class="card__name">${item.NameWithoutBrand}</h2>
    <p class="product-card__price">$ ${item.FinalPrice}</p>
    </a>
  </li>
    `;
  return newItem;
}

function discount(price,newprice) {
  if(price == newprice){
    return ""
  }else{
    let discountRange = (((newprice * 100) / price).toFixed(0)) - 100
    return discountRange
  }
}
