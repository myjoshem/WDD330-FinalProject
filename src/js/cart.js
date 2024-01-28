//this file is all about displaying contents of LocalStorage, ie. whats already been added to our cart

import { getLocalStorage } from "./utils.mjs";

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
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    // Handle the case when there's only one item (not an array)
    const htmlItem = cartItemTemplate(cartItem);
    document.querySelector(".product-list").innerHTML = htmlItem;
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
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  return newItem;
}
//this displays the items to the cart/index.html in html format
renderCartContents();
