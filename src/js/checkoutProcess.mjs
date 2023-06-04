import { check } from "prettier";
import { getLocalStorage, calculateTotal } from "./utils.mjs"

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
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
        
    },
    calculateOrdertotal: function() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = this.itemTotal * 0.06;
        this.shipping = (2 * (this.list.length - 1 )) + 10;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        // display the totals.
        this.displayOrderTotals();
    },
    displayOrderTotals: function() {
        // once the totals are all calculated display them in the order summary page
    }
    
}
export default checkoutProcess;
