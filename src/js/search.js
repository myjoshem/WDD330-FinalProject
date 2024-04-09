import { setCartSuperscriptHTML } from "./productDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import searchProductList from "./search.mjs";

const params = getParam();
let userQuery = params["q"];

loadHeaderFooter();
searchProductList(".product-list", userQuery);
setTimeout(() => setCartSuperscriptHTML(), 100);
