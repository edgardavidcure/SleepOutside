
import { setSuperscript, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";


loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const closeButton = document.querySelector('.close');
    const registerButton = document.getElementById('registerButton');
  
    const hasRegistered = getLocalStorage('registered');
  
    // If the visitor has not registered, show the modal
    if (!hasRegistered) {
      modal.style.display = 'block';
    }
  
    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Register button click event handler
    registerButton.addEventListener('click', () => {
      // Perform registration logic here
      // ...
  
      setLocalStorage('registered', 'true');
  
      // Close the modal
      modal.style.display = 'none';
    });
  });
  