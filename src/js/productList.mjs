import { getData } from "./productData.mjs";
import {qs} from "./utils.mjs";
export default async function productList(selector, category) {

    // get the element we will insert the list into from the selector
    const element = qs(selector);
    // get the list of products
    const productDataJson = await getData(category);
    // render out the product list to the element
    
    const htmlItems = productDataJson.map((item) => productCardTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
          }
         

// productList.mjs
function productCardTemplate(item) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=">
    <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <h3 class="card__brand">${item.Brand}</h3>
    <h2 class="card__name">${item.Name}</h2>
    <p class="product-card__price">${item.ListPrice}</p></a>
    <p class="product-card__suggested__price">${item.SuggestedRetailPrice}</p></a>
  </li>`
} 
