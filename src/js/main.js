
import { setSuperscript, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";
import Alert from "./alerts";

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
  
  
  const newsletterForm = document.getElementById('news-signup');

newsletterForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const alertInstance = new Alert();
  const alertsHTML = await alertInstance.alertsHTml();
 
  const successAlert = {
    message: 'You have successfully subscribed to our newsletter!',
    background: 'green',
    color: 'white'
  };

  const alertsContainer = document.getElementById('alert-list');
  const successAlertHTML = `<p style="background-color: ${successAlert.background}; color: ${successAlert.color};">${successAlert.message}</p>`;
  alertsContainer.innerHTML = successAlertHTML + alertsHTML;

  newsletterForm.reset();
  alertsContainer.style.animation = 'slideIn 0.5s forwards';

  setTimeout(function() {
    alertsContainer.style.animation = 'slideOut 0.5s forwards';
    alertsContainer.style.position = 'fixed'
  }, 5000);
});
  