import {formDataToJSON, getParam, loadHeaderFooter} from "../js/utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

document.forms["loginForm"].addEventListener("submit", (e) =>{
    e.preventDefault();
    const form = formDataToJSON(e.target);
    login(form, redirect);
})
