import { getLocalStorage, setLocalStorage, setClick, qs } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let product;

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  setClick("#addToCart", addToCartHandler);
}

//before we add a product to our cart, we must check if there are already items in the cart. If it is empty, it will create a new array. If it has items, it will check to see if they need to increase the quantity of an existing item or 'add' a new item.
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];

  console.log(cartItems);
  const existingItem = cartItems.find((item) => item.Id === product.Id);

  if (existingItem) {
    // Increment quantity if item already in the cart
    existingItem.quantity++;
  } else {
    // Add new item to the cart. This also dynamically adds the 'quantity' property to the products object in the cart so that we can now manipulate the product quantity in the cart
    product.quantity = 1;
    //now we 'push' or add, the new product object to the array of objects called 'cartItems'
    cartItems.push(product);
  }
  //after the array is created or updated, we will reset the contents of localstorage to the value of the array
  setLocalStorage("so-cart", cartItems);

  adjustCartSuperscript();
}

function adjustCartSuperscript() {
  // Add 1 to the cart-quantity local storage item

  console.log("in adjust cart super");
  // Get any number in cart-quantity if none then set to 0
  let cartQuantity = getLocalStorage("cart-quantity") || 0;
  console.log(cartQuantity);
  cartQuantity += 1;
  console.log(cartQuantity);

  // Set the new number to the cart-quantity field in localstorage
  setLocalStorage("cart-quantity", cartQuantity);

  // Refresh the superscript number on the page
  setCartSuperscriptHTML();
}

export function setCartSuperscriptHTML() {
  //changes the html of the cart superscript div to match the cart-quantity local storage
  let cartQuantity = getLocalStorage("cart-quantity") || 0;
  if (cartQuantity > 100) {
    qs(".superscript").classList.add("large-cart");
  } else {
    qs(".superscript").classList.remove("large-cart");
  }
  qs(".superscript").innerHTML = cartQuantity;
}
// add to cart button event handler
async function addToCartHandler(e) {
  try {
    const product = await findProductById(e.target.dataset.id);
    //once product retrieved, we pass it to the addProductToCart function
    addProductToCart(product);
  } catch (error) {
    console.error("Error in addToCartHandler:", error);
  }
  cartAnimation();
}

function cartAnimation() {
  // Makes the cart icon go through its shake animation
  let cartIcon = qs(".cart");
  cartIcon.classList.remove("shake");
  void cartIcon.offsetWidth;
  cartIcon.classList.add("shake");
}

function renderProductDetails() {
  document.title = `Sleep Outside | ${product.Brand.Name} ${product.NameWithoutBrand}`;
  qs(".productName").innerText = product.Brand.Name;
  qs(".productNameWithoutBrand").innerText = product.NameWithoutBrand;
  qs(".productImage").src = product.Image;
  qs(".productImage").alt = product.Name;
  qs(".productFinalPrice").innerText = "$" + product.FinalPrice;
  qs(".productSuggestedRetailPrice").innerText =
    "$" + product.SuggestedRetailPrice;
  qs(".productColorName").innerText = product.Colors[0].ColorName;
  qs(".productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  qs("#addToCart").dataset.id = product.Id;
}
