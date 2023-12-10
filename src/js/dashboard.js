import {
  alertMessage,
  getLocalStorage,
  setLocalStorage,
  getParam,
} from "./utils.mjs";
import jwt_decode from "jwt-decode";
const userNameEl = document.getElementById("userName");

// function getUserInfo() {
//   const token = getParam("token");
//   const userInfo = jwt_decode(token);
//   return userInfo;
// }
// const userInfo = getUserInfo();
// console.log(userInfo);
// userName.textContent = userInfo.displayName;
// getUserInfo();

async function getAuthHeader() {
  try {
    const response = await fetch("http://localhost:5173/dashboard/index.html");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const authHeader = response.headers.get("Authorization");

    if (!authHeader) {
      throw new Error("Authorization header not found in the response");
    }

    // Extract the token from the Authorization header
    const authToken = authHeader.split(" ")[1];
    console.log("Authorization Token:", authToken);

    return authToken;
  } catch (error) {
    console.error("Error:", error);
  }
}

getAuthHeader();
