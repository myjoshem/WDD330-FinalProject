import { getData } from "./productData.mjs";
import { qs, renderListWithTemplate } from "./utils.mjs";

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const element = qs(selector);
  // get the list of products
  const productDataJson = await getData(category);
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
    <a href="../product_pages/index.html?product=${item.Id}">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <h3 class="card__brand">${item.Brand.Name} ${item.NameWithoutBrand}</h3>
    <h2 class="card__name">${item.Name}</h2>
    <p class="product-card__price">${item.ListPrice}</p></a>
    <p class="product-card__suggested__price">${item.SuggestedRetailPrice}</p></a>
  </li>`;
}
