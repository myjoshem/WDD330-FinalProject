import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
let product;

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

//before we add a product to our cart, we must check if there are already items in the cart. If it is empty, it will create a new array. If it has items, it will check to see if they need to increase the quantity of an existing item or 'add' a new item.
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log(cartItems);
  const existingItem = cartItems.find((item) => item.Id === product.Id);

  if (existingItem) {
    // Increment quantity if item already in the cart
    existingItem.quantity += 1;
  } else {
    // Add new item to the cart
    product.quantity = 1;
    cartItems.push(product);
  }
  //after the array is created or updated, we will reset the contents of local storage to the value of the array
  setLocalStorage("so-cart", cartItems);
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
  let cartIcon = document.querySelector(".cart");
  cartIcon.classList.remove("shake");
  void cartIcon.offsetWidth;
  cartIcon.classList.add("shake");
  setTimeout(() => {
    cartIcon.classList.remove("shake");
  }, 2000);
}

function renderProductDetails() {
  document.title = `Sleep Outside | ${product.Brand.Name} ${product.NameWithoutBrand}`;
  document.querySelector(".productName").innerText = product.Brand.Name;
  document.querySelector(".productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector(".productImage").src = product.Image;
  document.querySelector(".productImage").alt = product.Name;
  document.querySelector(".productFinalPrice").innerText = product.FinalPrice;
  document.querySelector(".productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector(".productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
