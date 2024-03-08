import { loadHeaderFooter } from "./utils.mjs";
import { setCartSuperscriptHTML } from "./productDetails.mjs";


loadHeaderFooter();
//setCartSuperscriptHTML();
setTimeout(() => setCartSuperscriptHTML(), 100);
