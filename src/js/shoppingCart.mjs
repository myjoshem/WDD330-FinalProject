import { qs, getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItem = getLocalStorage("so-cart");
  const element = qs(".product-list");
  // Check if cartItem is an object
  if (!cartItem || typeof cartItem !== "object") {
    console.error("Invalid cart item:", cartItem);
    return;
  }

  // Check if cartItem is an array
  if (Array.isArray(cartItem)) {
    renderListWithTemplate(cartItemTemplate, element, cartItem);
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
