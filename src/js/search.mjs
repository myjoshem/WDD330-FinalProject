import { getProductsByCategory } from "./externalServices.mjs";
import { qs, renderListWithTemplate } from "./utils.mjs";
import { productCardTemplate } from "./productList.mjs";

export default async function searchProductList(selector, search) {
  // get the element we will insert the list into from the selector
  const element = qs(selector);
  // get the list of products
  const tentsDataJson = await getProductsByCategory("tents");
  const hammocksDataJson = await getProductsByCategory("hammocks");
  const backpacksDataJson = await getProductsByCategory("backpacks");
  const sleepingBagsDataJson = await getProductsByCategory("sleeping-bags");
  const jsonArray = [
    ...tentsDataJson,
    ...hammocksDataJson,
    ...backpacksDataJson,
    ...sleepingBagsDataJson,
  ];
  // Filter the list to remove extra JSON items
  const filteredDataJson = filterJsonByString(jsonArray, search);
  // render out the product list to the element
  qs(".search__form input").value = search;
  qs(".category__name").innerHTML = search;
  renderListWithTemplate(productCardTemplate, element, filteredDataJson);
}

// Function to filter JSON data by a certain string
function filterJsonByString(data, searchString) {
  return data.filter((item) => JSON.stringify(item).includes(searchString));
}
