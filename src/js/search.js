import { setCartSuperscriptHTML } from "./productDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import searchProductList from "./search.mjs";

let userQuery = getParam("q");

loadHeaderFooter();
searchProductList(".product-list", userQuery);
setTimeout(() => setCartSuperscriptHTML(), 100);
