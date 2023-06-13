// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn();
  parentElement.innerHTML = htmlString;
  if (callback) {
    callback();
  }
}


export function setSuperscript() {
  const backpackSuperscript = document.getElementById("superscript");
  let cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    let totalItemsInCart = 0;
    cartItems.forEach(item => {
      totalItemsInCart += item.totalInCart
    backpackSuperscript.innerText = totalItemsInCart
    });
    backpackSuperscript.style.display = "block";
  } else{
    backpackSuperscript.style.display = "none"
  }
}

export function discount(price, newprice) {
  if (price == newprice) {
    return "";
  } else {
    let discountRange = ((newprice * 100) / price).toFixed(0) - 100;
    return discountRange;
  }
}

function loadTemplate(path) {
  // wait what?  we are returning a new function?
  // this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
  renderWithTemplate(headerTemplateFn, headerElement, setSuperscript);
  renderWithTemplate(footerTemplateFn, footerElement);
}

export function capitalize(text) {
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

export function calculateTotal(cartItems){
  let cartTotal = 0;
  let cartItemsPrices = [];
  cartItems.forEach(item => {
    cartItemsPrices.push(item.totalInCart * item.FinalPrice) 
  });
  cartTotal = (cartItemsPrices.reduce((a, b) => (a + b), 0)).toFixed(2);
  return cartTotal
}

export function alertMessage(message, scroll = true, duration = 5000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  setTimeout(function () {
    main.removeChild(alert);
  }, duration);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}