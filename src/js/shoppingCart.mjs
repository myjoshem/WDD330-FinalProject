import { qs, getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItem = getLocalStorage("so-cart");
  const element = qs(".product-list");
  cartTotal();
  // Check if cart is empty
  if (cartItem == null) {
    console.log("cart is empty");
    element.innerHTML = "Cart is empty";
    return;
  }
  // Check if cartItem is an object
  if (!cartItem || typeof cartItem !== "object") {
    console.error("Invalid cart item:", cartItem);
    return;
  }

  // Check if cartItem is an array
  if (Array.isArray(cartItem)) {
    console.log(cartItem);
    renderListWithTemplate(cartItemTemplate, element, cartItem);
  } else {
    // Handle the case when there's only one item (not an array)
    const htmlItem = cartItemTemplate(cartItem);
    qs(".product-list").innerHTML = htmlItem;
  }
}

function cartTotal() {
  const cartItem = getLocalStorage("so-cart");
  const totalElement = document.querySelector(".cart-total");
  const totalPrice = document.querySelector(".cart-price");
  //const checkoutTotal = document.querySelector("#orderTotal");

  if (!cartItem || cartItem.length === 0) {
    totalElement.classList.add("total-hidden");
    totalPrice.classList.add("total-hidden");
  } else {
    totalElement.classList.remove("total-hidden");
    totalPrice.classList.remove("total-hidden");
    let totalItems = 0;
    let totalCartPrice = 0;

    cartItem.forEach(item => {
      const itemPrice = item.quantity * item.FinalPrice;
      totalItems += item.quantity;
      totalCartPrice += itemPrice;
    });

    totalElement.textContent = "Quantity: " + totalItems;
    totalPrice.textContent = "Price: $" + totalCartPrice.toFixed(2); // Display total price with 2 decimal places
    //checkoutTotal.textContent = 
  }
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
      <a href="../product_pages/index.html?category=${item.Category}&product=${item.Id}" class="cart-card__image">
        <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
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
      <div class="cart-card__price"><p>$${item.FinalPrice}</p><p class="cart-card__delete__button" data-id="${item.Id}">X</p></div>
      
    </li>`;
  return newItem;
}
