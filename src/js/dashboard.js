import { getUserInfo } from "./utils.mjs";
import { logout, convertToJson, handleLogout } from "./externalServices.mjs";

const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logout-btn");
const userInfo = getUserInfo();
userName.textContent = userInfo.displayName;
logoutBtn.addEventListener("click", async () => {
  await handleLogout();
});

//things to do:
//save the user data in local storage to display it across multiple pages
//fetch user reviews
//improve dashboard layout and design
