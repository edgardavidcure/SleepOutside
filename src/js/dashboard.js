import {
  alertMessage,
  getLocalStorage,
  setLocalStorage,
  getParam,
  getUserInfo,
} from "./utils.mjs";
const userNameEl = document.getElementById("userName");

const userInfo = getUserInfo();
userName.textContent = userInfo.displayName;
getUserInfo();

//things to do:
//save the user data in local storage to display it across multiple pages
//fetch user reviews
//improve dashboard layout and design
