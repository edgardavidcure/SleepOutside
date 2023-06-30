import { loadHeaderFooter, getParam, discount, setLocalStorage, getLocalStorage } from "./utils.mjs";
import  productList from "./productList.mjs";
import { getProductsByCategory } from "./externalServices.mjs";


const productsList = document.querySelector(".product-list");
const category = getParam("type")
const closeBtn = document.querySelector(".close");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modalContent");
const modalProduct = document.getElementById("modalProduct");
const searchInput = document.getElementById("searchBar");
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
    modalProduct.setAttribute("href", `../product_pages/index.html?product=${product.Id}`)
    if(product.SuggestedRetailPrice != product.FinalPrice){
      const discountSpan = document.getElementById("discount");
      discountSpan.setAttribute("class", "discount");
      discountSpan.innerHTML = discount(product.SuggestedRetailPrice,product.FinalPrice);
      document.getElementById("productSuggestedPrice").innerHTML = `$${(product.SuggestedRetailPrice).toFixed(2)}`;
  
    }
    
}


function checkItemIsWished(product, source){
  if (product.wished == true){
    source.classList.add("fa-solid")
  } else{
    source.classList.remove("fa-solid")
  }
}






function addProductToWishlist(product, source) {
  let products = []
  let wishlist = getLocalStorage("so-wishlist");

  if (wishlist == null){
    wishlist = products
  } else {
    products = wishlist
  }
  const isProductInWishlist = wishlist.some((p) => p.Id === product.Id);
  if (isProductInWishlist) {
    // Remove the item from the wishlist
    let findItemIndex = products.findIndex((item) => item.Id == product.Id)
    products.splice(findItemIndex, 1)
    product.wished = false;
  } else {
    // Add the item to the wishlist
    product.wished = true;
    products.push(product);
  }
  checkItemIsWished(product, source);

  setLocalStorage("so-wishlist", products);
}







productsList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("fa-eye")) {
    const id = event.target.id
    event.preventDefault();
    const [product] =  await getProductData(id)
    renderModal(product)
    modal.style.display = "block"
    
    } else if (event.target.classList.contains("fa-heart")){
      const id = event.target.id;
      event.preventDefault();
      const [product] = await getProductData(id);
      addProductToWishlist(product, event.target)
      checkItemIsWished(product, event.target)

    }
  
  });


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


  //Sort Feature
  const nameSortButton = document.getElementById("sortName");
  const priceSortButton = document.getElementById("sortFinalPrice");

  nameSortButton.addEventListener("click", (e) =>{
    let isActive = nameSortButton.classList.contains("sortButtonActive");

    if(isActive){
      nameSortButton.classList.remove("sortButtonActive");
      productList(productsList,category);
    }else{
      if(priceSortButton.classList.contains("sortButtonActive")){
        priceSortButton.classList.remove("sortButtonActive");
      }
      nameSortButton.classList.add("sortButtonActive");
      productList(productsList, category,"" , "Name");
    }

  })

  priceSortButton.addEventListener("click", (e) =>{
    let isActive = priceSortButton.classList.contains("sortButtonActive");

    if(isActive){
      priceSortButton.classList.remove("sortButtonActive");
      productList(productsList, category);
    }else{
      if(nameSortButton.classList.contains("sortButtonActive")){
        nameSortButton.classList.remove("sortButtonActive");
      }
      priceSortButton.classList.add("sortButtonActive");
      productList(productsList, category,"", "Price");
    }

  })
 
  

  searchInput.addEventListener("input",(e)=>{
    productList(productsList, category, e.target.value);

  })
