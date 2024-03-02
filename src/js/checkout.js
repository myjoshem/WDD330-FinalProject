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
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess),
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status) 
  checkoutProcess.checkout(e.target);

  // Redirect to success.html
  window.location.href = "success.html";
//retrieve data from the checkoutProcess ('json' object with form data, 'res' has order confirmation and id)
  localStorage.clear();

});
