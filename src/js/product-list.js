import productList from "./productList.mjs";
import { setCartSuperscriptHTML } from "./productDetails.mjs";
import { getParam } from "./utils.mjs";

let category = getParam("category");

productList(".product-list", category);
setTimeout(() => setCartSuperscriptHTML(), 100);
