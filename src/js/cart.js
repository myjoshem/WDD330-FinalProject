//this file is all about displaying contents of LocalStorage, ie. whats already been added to our cart

import { getLocalStorage, setClick, qs, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

// for incrementing or decrementing quantities already in the cart
// Function to handle incrementing the quantity
function incrementQuantity(id) {
  /* 
                      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
                      const itemIndex = cartItems.findIndex((item) => item.id === id);
                      if (itemIndex !== -1) {
                        cartItems[itemIndex].quantity++;
                        localStorage.setItem("cart", JSON.stringify(cartItems));
                      } */
}

// Function to handle decrementing the quantity
function decrementQuantity(id) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cartItems.findIndex((item) => item.id === id);
  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    cartItems[itemIndex].quantity--;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

// Event delegation to handle click events for increment and decrement buttons
// setClick("click", (e) => {
//   const target = e.target;
//   if (target.classList.contains("increment")) {
//     const id = target.dataset.id;
//     incrementQuantity(id);
//     // Update UI or perform any other actions after incrementing
//     renderCartContents();
//   } else if (target.classList.contains("decrement")) {
//     const id = target.dataset.id;
//     decrementQuantity(id);
//     // Update UI or perform any other actions after decrementing
//     renderCartContents();
//   }
// });
