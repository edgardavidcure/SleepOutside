import { getLocalStorage, calculateTotal, setLocalStorage, alertMessage, formDataToJSON} from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    totalQuantityInCart : 0,
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    } , 
    calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
        this.itemTotal = calculateTotal(this.list);   
         
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
          );
          const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
          );
          summaryElement.innerText = "$" + this.itemTotal;
          this.list.forEach(item => {
            this.totalQuantityInCart += item.totalInCart;
          });
          itemNumElement.innerText = this.totalQuantityInCart;
    },
    calculateOrdertotal: function() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.shipping = (2 * (this.totalQuantityInCart - 1)) + 10;
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2);
        // display the totals.
        this.displayOrderTotals();
    },
    displayOrderTotals: function() {
        // once the totals are all calculated display them in the order summary page
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(
        this.outputSelector + " #orderTotal"
        );
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    },
    checkout: async function(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const json = formDataToJSON(form);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        try {
          const res = await checkout(json);
          setLocalStorage("so-cart", [])
          location.assign("/checkout/success.html");
        } catch (err) {
          console.log(err);
          for (let message in err.message) {
            alertMessage(err.message[message]);
          }
        }
      }
    
}
export default checkoutProcess;
