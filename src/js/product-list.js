import productList, { modalListenerSetUp } from "./productList.mjs";
import { setCartSuperscriptHTML } from "./productDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

let category = getParam("category");

setUpProductListPage();
async function setUpProductListPage() {
  loadHeaderFooter();
  await productList(".product-list", category);
  setCartSuperscriptHTML();
  modalListenerSetUp();
}
