//this file is all about displaying contents of LocalStorage, ie. whats already been added to our cart

import { getLocalStorage, setClick, qs } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

/* In summary, this function renderCartContents retrieves cart data from local storage, checks its validity, and then dynamically generates HTML to display the cart contents on a webpage. It adapts its behavior based on whether there's only one item in the cart or multiple items. */
function renderCartContents() {
  const cartItem = getLocalStorage("so-cart");

  // Check if cartItem is an object
  if (!cartItem || typeof cartItem !== "object") {
    console.error("Invalid cart item:", cartItem);
    return;
  }

  // Check if cartItem is an array
  if (Array.isArray(cartItem)) {
    const htmlItems = cartItem.map((item) => cartItemTemplate(item));
    qs(".product-list").innerHTML = htmlItems.join("");
  } else {
    // Handle the case when there's only one item (not an array)
    const htmlItem = cartItemTemplate(cartItem);
    qs(".product-list").innerHTML = htmlItem;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="quantity-controls">
      <button class="decrement button__quantity" data-id="${item.Id}">-</button>
      <span class="cart-card__quantity quantity">${item.quantity}</span>
      <button class="increment button__quantity" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  return newItem;
}
//this displays the items to the cart/index.html in html format
renderCartContents();

// for incrementing or decrementing quantities already in the cart
// Function to handle incrementing the quantity
function incrementQuantity(id) {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const itemIndex = cartItems.findIndex((item) => item.id === id);
  console.log(itemIndex);
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity++;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

// Function to handle decrementing the quantity
function decrementQuantity(id) {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const itemIndex = cartItems.findIndex((item) => item.id === id);
  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    cartItems[itemIndex].quantity--;
    localStorage.setItem("cart", JSON.stringify(cartItems));
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
