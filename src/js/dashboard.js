import {
  alertMessage,
  getLocalStorage,
  setLocalStorage,
  getParam,
} from "./utils.mjs";
import jwt_decode from "jwt-decode";
const userNameEl = document.getElementById("userName");
const jwt = getCookie("jwt");

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}

function getUserInfo() {
  const userInfo = jwt_decode(jwt);
  return userInfo;
}
const userInfo = getUserInfo();
console.log(userInfo);
userName.textContent = userInfo.displayName;
getUserInfo();

//things to do:
//save the user data in local storage to display it across multiple pages
//fetch user reviews
//improve dashboard layout and design
