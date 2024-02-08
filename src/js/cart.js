//this file is all about displaying contents of LocalStorage, ie. whats already been added to our cart

import { getLocalStorage, setClick, qs, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

// for incrementing or decrementing quantities already in the cart
// Function to handle incrementing the quantity
function incrementQuantity(id) {

  console.log(id);
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  console.log(cartItems[0]);
  const itemIndex = cartItems.findIndex((item) => item.Id === id);
  console.log(itemIndex);
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity++;
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
  }

}

// Function to handle decrementing the quantity
function decrementQuantity(id) {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const itemIndex = cartItems.findIndex((item) => item.Id === id);
  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    cartItems[itemIndex].quantity--;
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
  }
}

// Event delegation to handle click events for increment and decrement buttons

setClick("click", (e) => {
  const target = e.target;
  if (target.classList.contains("increment")) {
    const id = target.dataset.id;
    incrementQuantity(id);
    console.log("increment");
    // Update UI or perform any other actions after incrementing
    renderCartContents();
  } else if (target.classList.contains("decrement")) {
    const id = target.dataset.id;
    decrementQuantity(id);
    // Update UI or perform any other actions after decrementing
    renderCartContents();
  }
});

