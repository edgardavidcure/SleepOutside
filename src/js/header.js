import { handleLogout } from "./externalServices.mjs";
import { getUserInfo, loadHeaderFooter, searchItems } from "./utils.mjs";
const reviewsApiURL = import.meta.env.VITE_REVIEWSAPI_URL;
loadHeaderFooter();

function checkLoginState() {
  const user = getUserInfo();
  return user ? user : null;
}

function updateLoginState() {
  const loginStateElement = document.querySelector("#user-header span");
  const modal = document.querySelector(".auth-modal");
  const loginState = checkLoginState();
  if (loginState) {
    loginStateElement.innerHTML = loginState.firstName;
    const dashboardButton = `<button type="button" class="modal-btn" id="linkToDashboard">
    Go to dashboard
  </button>`;
    const logoutButton = `<button type="button" class="modal-btn" id="logoutBtn">
    Logout
  </button>`;

    modal.insertAdjacentHTML("beforeend", dashboardButton);
    modal.insertAdjacentHTML("beforeend", logoutButton);
  } else {
    loginStateElement.innerHTML = "Sign In";
    const loginButton = `<button type="button" class="login-with-google-btn" id="google-login">
    Sign in with Google
  </button>`;
    modal.insertAdjacentHTML("beforeend", loginButton);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await searchItems();
  updateLoginState();
  addListeners();

  const userHeader = document.getElementById("user-header");
  const authModal = document.querySelector(".auth-modal");

  userHeader.addEventListener("click", () => {
    authModal.classList.toggle("active-options");
  });
});

function addListeners() {
  const loginState = checkLoginState();
  if (loginState) {
    const dashboardButtonElement = document.getElementById("linkToDashboard");
    const logoutButtonElement = document.getElementById("logoutBtn");
    dashboardButtonElement.addEventListener("click", () => {
      window.location.href = "https://sleepout.netlify.app/dashboard/";
    });
    logoutButtonElement.addEventListener("click", async () => {
      await handleLogout();
    });
  } else {
    const googleLoginBtn = document.getElementById("google-login");

    googleLoginBtn.addEventListener("click", async () => {
      const googleLoginURL = reviewsApiURL + "/google";
      console.log(googleLoginURL);
      window.location.href = googleLoginURL;
    });
  }
}
