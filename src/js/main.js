import { loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";
import { setCartSuperscriptHTML } from "./productDetails.mjs";

loadHeaderFooter();
productList(".product-list", "tents");
//setCartSuperscriptHTML();
setTimeout(() => setCartSuperscriptHTML(), 100);
