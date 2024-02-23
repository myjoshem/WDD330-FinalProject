import { loadHeaderFooter } from "./utils.mjs";
import { setCartSuperscriptHTML } from "./productDetails.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();
setTimeout(() => setCartSuperscriptHTML(), 1000);

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.checkout(e.target);
});
