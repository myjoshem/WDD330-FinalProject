//this file is all about displaying contents of LocalStorage, ie. whats already been added to our cart

import { getLocalStorage, setClick, qs, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import {
  setCartSuperscriptHTML,
  adjustAddCartSuperscript,
  adjustSubtractCartSuperscript,
} from "./productDetails.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();
setUpListeners();
setTimeout(() => setCartSuperscriptHTML(), 100);
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
  console.log("inside decrement");
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const itemIndex = cartItems.findIndex((item) => item.Id === id);
  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    cartItems[itemIndex].quantity--;
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
  }
}

// Event delegation to handle click events for increment and decrement buttons

// setClick("click", (e) => {
//   const target = e.target;
//   if (target.classList.contains("increment")) {
//     const id = target.dataset.id;
//     incrementQuantity(id);
//     console.log("increment");
//     // Update UI or perform any other actions after incrementing
//     shoppingCart();
//     adjustAddCartSuperscript();
//     // setTimeout(() => setCartSuperscriptHTML(), 100);
//   } else if (target.classList.contains("decrement")) {
//     const id = target.dataset.id;
//     decrementQuantity(id);
//     // Update UI or perform any other actions after decrementing
//     adjustSubtractCartSuperscript();
//     shoppingCart();
//     // setTimeout(() => setCartSuperscriptHTML(), 100);
//   }
// });

// setClick(".increment", incrementFunction(event));
// setClick(".decrement", decrementFunction(event));

// function incrementFunction(e) {
//   const target = e.target;
//   const id = target.dataset.id;
//   incrementQuantity(id);
//   console.log("increment");
//   // Update UI or perform any other actions after incrementing
//   shoppingCart();
//   adjustAddCartSuperscript();
//   // setTimeout(() => setCartSuperscriptHTML(), 100);
// }

// function decrementFunction(e) {
//   const target = e.target;
//   const id = target.dataset.id;
//   decrementQuantity(id);
//   // Update UI or perform any other actions after decrementing
//   adjustSubtractCartSuperscript();
//   shoppingCart();
//   // setTimeout(() => setCartSuperscriptHTML(), 100);
// }

function setUpListeners() {
  var increments = document.querySelectorAll(".increment");
  increments.forEach(function (increment) {
    increment.addEventListener("touchend", (e) => {
      event.preventDefault(); //prevents defaults like scrolling, etc. on device
      const target = e.target;
      const id = target.dataset.id;
      incrementQuantity(id);
      console.log("increment");
      // Update UI or perform any other actions after incrementing
      shoppingCart();
      adjustAddCartSuperscript();
      setUpListeners();
      // setTimeout(() => setCartSuperscriptHTML(), 100);
    });

    increment.addEventListener("click", (e) => {
      const target = e.target;
      //prevents defaults like scrolling, etc. on device
      const id = target.dataset.id;
      incrementQuantity(id);
      console.log("increment");
      // Update UI or perform any other actions after incrementing
      shoppingCart();
      adjustAddCartSuperscript();
      setUpListeners();
      // setTimeout(() => setCartSuperscriptHTML(), 100);
    });
  });

  var decrements = document.querySelectorAll(".decrement");
  decrements.forEach(function (decrement) {
    decrement.addEventListener("touchend", (e) => {
      event.preventDefault(); //prevents defaults like scrolling, etc. on device
      const target = e.target;
      const id = target.dataset.id;
      decrementQuantity(id);
      console.log("decrement");
      // Update UI or perform any other actions after incrementing
      shoppingCart();
      adjustSubtractCartSuperscript();
      setUpListeners();
      // setTimeout(() => setCartSuperscriptHTML(), 100);
    });

    decrement.addEventListener("click", (e) => {
      const target = e.target;
      //prevents defaults like scrolling, etc. on device
      const id = target.dataset.id;
      decrementQuantity(id);
      console.log("decrement");
      // Update UI or perform any other actions after incrementing
      shoppingCart();
      adjustSubtractCartSuperscript();
      setUpListeners();
      // setTimeout(() => setCartSuperscriptHTML(), 100);
    });
  });
}
