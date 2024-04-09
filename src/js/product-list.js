import productList, { modalListenerSetUp } from "./productList.mjs";
import { setCartSuperscriptHTML } from "./productDetails.mjs";
import { getParam, loadHeaderFooter, qs } from "./utils.mjs";

const params = getParam();
let category = params["category"];
let button = qs("#sort__button");

setUpProductListPage();
async function setUpProductListPage() {
  loadHeaderFooter();
  await productList(".product-list", category);
  setCartSuperscriptHTML();
  modalListenerSetUp();
}
button.addEventListener("click", sortList);

function sortList() {
  console.log("Hello");
  let productListElement = qs(".product-list");
  //let productsArray = [];
  let productsArray = Array.from(
    productListElement.querySelectorAll(".product-card"),
  );

  //for (var i = 0; i < products.length; i++) {
  //  productsArray.push(products[i]);
  //}
  console.log(productsArray);
  let sortType = qs("#sort__type").value;
  let sortDirection = qs("#sort__direction").value;
  console.log(sortType);

  if (sortType == "name") {
    if (sortDirection == "asc") {
      productsArray.sort(function (a, b) {
        var productA = a
          .querySelector(".card__name")
          .textContent.trim()
          .toLowerCase();
        var productB = b
          .querySelector(".card__name")
          .textContent.trim()
          .toLowerCase();
        if (productA < productB) return 1;
        if (productA > productB) return -1;
        return 0;
      });
      productListElement.innerHTML = "";
      productsArray.forEach(function (product) {
        productListElement.appendChild(product);
      });
    } else {
      productsArray.sort(function (a, b) {
        var productA = a
          .querySelector(".card__name")
          .textContent.trim()
          .toLowerCase();
        var productB = b
          .querySelector(".card__name")
          .textContent.trim()
          .toLowerCase();
        if (productA < productB) return -1;
        if (productA > productB) return 1;
        return 0;
      });
      productListElement.innerHTML = "";
      productsArray.forEach(function (product) {
        productListElement.appendChild(product);
      });
    }
  }
  if (sortType == "price") {
    console.log("inside price");
    if (sortDirection == "asc") {
      productsArray.sort(function (a, b) {
        var productA = Number(
          a.querySelector(".product-card__price").innerHTML,
        );
        var productB = Number(
          b.querySelector(".product-card__price").innerHTML,
        );
        console.log(productA, productB);
        if (productA < productB) return -1;
        if (productA > productB) return 1;
        return 0;
      });
      productListElement.innerHTML = "";
      productsArray.forEach(function (product) {
        console.log(product);
        productListElement.appendChild(product);
      });
    } else {
      productsArray.sort(function (a, b) {
        var productA = Number(
          a.querySelector(".product-card__price").innerHTML,
        );
        var productB = Number(
          b.querySelector(".product-card__price").innerHTML,
        );
        console.log(productA, productB);
        if (productA < productB) return 1;
        if (productA > productB) return -1;
        return 0;
      });
      productListElement.innerHTML = "";
      productsArray.forEach(function (product) {
        console.log(product);
        productListElement.appendChild(product);
      });
    }
  }
}
