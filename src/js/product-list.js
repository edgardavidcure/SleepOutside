import { loadHeaderFooter, getParam  } from "./utils.mjs";
import productList from "./productList.mjs";
const productsList = document.querySelector(".product-list");
const category = getParam("type")
productList(productsList, category);
loadHeaderFooter();

