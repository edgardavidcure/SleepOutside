import { loadHeaderFooter, getParam, discount } from "./utils.mjs";
import productList from "./productList.mjs";
import { getProductsByCategory } from "./externalServices.mjs";

const productsList = document.querySelector(".product-list");
const category = getParam("type")
const closeBtn = document.querySelector(".close");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modalContent");
const modalProduct = document.getElementById("modalProduct")

productList(productsList, category);
loadHeaderFooter();


async function getProductData(id){
  let products = await getProductsByCategory(category);
  products = products.filter(
    (item) => item.Id == id
  );
  return products

}

function renderModal(product){
  
    document.getElementById("productName").innerHTML = product.Name;
    document.getElementById("productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
    document.getElementById("productImage").setAttribute("src", product.Images.PrimaryLarge);
    document.getElementById("productFinalPrice").innerHTML = `$${product.FinalPrice}`;
    document.getElementById("productColorName").innerHTML = product.Colors[0].ColorName;
    document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    modalProduct.setAttribute( "href", `../product_pages/index.html?product=${product.Id}`)
    if(product.SuggestedRetailPrice != product.FinalPrice){
      const discountSpan = document.getElementById("discount");
      discountSpan.setAttribute("class", "discount");
      discountSpan.innerHTML = discount(product.SuggestedRetailPrice,product.FinalPrice);
      document.getElementById("productSuggestedPrice").innerHTML = `$${(product.SuggestedRetailPrice).toFixed(2)}`;
  
    }
    
}
  


productsList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("fa-eye")) {
    const id = event.target.id
    event.preventDefault();
    const [product] =  await getProductData(id)
    renderModal(product)
    modal.style.display = "block"
    
    }});
closeBtn.addEventListener("click", (event) => {
  if (event.target.classList.contains("close")){
    event.preventDefault();
    modal.style.display = "none";

  }
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }