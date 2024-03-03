import { getProductsByCategory } from "./externalServices.mjs";
import { qs, renderListWithTemplate } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";

let product;
export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const element = qs(selector);
  // get the list of products
  const productDataJson = await getProductsByCategory(category);
  // Filter the list to remove extra JSON items
  const filteredDataJson = productDataJson.filter(removeExtraProducts);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, element, filteredDataJson);
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  qs(".category__name").innerHTML = ` ${capitalizedCategory}`;
}

function removeExtraProducts(jsonData) {
  console.log(jsonData.Id);
  // Remove items with a specific ID
  return jsonData.Id != "989CG" && jsonData.Id != "880RT";
}

// productList.mjs
export function productCardTemplate(item) {
  return `<li class="product-card">
    <div class="modal__symbol" data-id="${item.Id}"></div>
    <a href="../product_pages/index.html?product=${item.Id}">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <h3 class="card__brand">${item.Brand.Name} ${item.NameWithoutBrand}</h3>
    <h2 class="card__name">${item.Name}</h2>
    <p class="product-card__price">${item.ListPrice}</p></a>
    <p class="product-card__suggested__price">${item.SuggestedRetailPrice}</p></a>
  </li>`;
}


export function modalListenerSetUp() {
  var modalButtons = document.querySelectorAll(".modal__symbol");
  modalButtons.forEach(function (modaler) {
    modaler.addEventListener("touchend", (e) => {
      e.preventDefault();
      console.log("hi")
      const target = e.target;
      const id = target.dataset.id;
      console.log(id);
      loadModal(id);
      console.log("MODAL WORKING");
      // setTimeout(() => setCartSuperscriptHTML(), 100);
    });
    modaler.addEventListener("click", (e) => {
      const target = e.target;
      const id = target.dataset.id;
      console.log(id);
      loadModal(id);
      console.log("MODAL WORKING");
      // setTimeout(() => setCartSuperscriptHTML(), 100);
    });
  });
}

async function loadModal(id) {
  console.log(id);
  product = await findProductById(id);
  let modalContainer = qs(".product-list__modal");
  modalContainer.classList.remove("modal__hidden");
  console.log(product);
  qs(".productName").innerText = product.Brand.Name;
  qs(".productNameWithoutBrand").innerText = product.NameWithoutBrand;
  qs(".productImage").src = product.Images.PrimaryLarge;
  qs(".productImage").alt = product.Name;
  qs(".productFinalPrice").innerText = "$" + product.FinalPrice;
  qs(".productSuggestedRetailPrice").innerText =
    "$" + product.SuggestedRetailPrice;
  qs(".productColorName").innerText = product.Colors[0].ColorName;
  qs(".productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;

  window.addEventListener("click", windowClickOut);
  //window.addEventListener("click", (e) => {
  //  let target = e.target;
  //  console.log("window");
  //  const target = e.target;
  //  if (target === modalContainer) {
  //    modalContainer.classList.add("modal__hidden");
  //  }
  //  //qs("product-list__modal")
  //  modalListenerSetUp();
  //});
}

const windowClickOut = (e) => {
  const target = e.target;
  let main = qs("main");
  if (main.contains(target)) {
    console.log("main");
    e.preventDefault();
  }
 
  console.log("window");
  let modalContainer = qs(".product-list__modal");
  
  console.log(target);
  if (target != + modalContainer && !modalContainer.contains(target)) {
    modalContainer.classList.add("modal__hidden");
  }
  else if (target === qs(".modal__exit")) {
    modalContainer.classList.add("modal__hidden");
  }
  //qs("product-list__modal ")
  product = null;
}

//export default async function productDetails(productId) {
//  try {
//    product = await findProductById(productId);
//  } finally {
//    if (product == undefined) {
//      productNotFound();
//    } else {
//      renderProductDetails();
//      setClick("#addToCart", addToCartHandler);
//    }
//  }
//}

//function productNotFound() {
//  const cartButton = qs("#addToCart");
//  const h2 = qs(".productNameWithoutBrand");
//  const p = qs(".product__description");
//  cartButton.remove();
//  h2.innerText = "Error: Product Not Found";
//  p.innerText =
//    "We were unable to find this product. Please check the URL or reach out to a customer service representative. Or consider looking at another one of our other fine products.";
//}
