import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";


export async function login(creds, redirect = "/"){
    try {
        const token = await loginRequest(creds);
        setLocalStorage("so-token", token.accessToken);
        window.location = redirect;
    } catch (error) {
        alertMessage(error.message.message);
    }

};


export function isTokenValid(token){
    if (token){
        const decoded = jwt_decode(token);
        const currentDate = new Date();
        console.log(decoded);
        

        if (decoded.exp * 1000 < currentDate.getTime()) {
            //token expiration has passed
            console.log("Token expired.");
            return false;
            } else {
            // token not expired
            console.log("Valid token");
            return true;
            }
    }else{
        return false
    }
}


export function checkLogin(){
    const token = getLocalStorage("so-token");
    const tokenCheck = isTokenValid(token);
    if (!tokenCheck){
        setLocalStorage("so-token", "");
        const path = window.location;
        window.location = `/login/index.html?redirect=${path.pathname}`;

    }
    else{
        return token
    }
}
