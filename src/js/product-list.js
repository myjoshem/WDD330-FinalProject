import productList from "./productList.mjs";
import { setCartSuperscriptHTML } from "./productDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

let category = getParam("category");

loadHeaderFooter();
productList(".product-list", category);
setTimeout(() => setCartSuperscriptHTML(), 100);
