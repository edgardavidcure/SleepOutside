import productList from "./productList.mjs";
import { getLocalStorage } from "./utils.mjs";
import { setSuperscript } from "./utils.mjs";
const productsList = document.querySelector(".product-list")
productList(productsList, "tents");



setSuperscript()