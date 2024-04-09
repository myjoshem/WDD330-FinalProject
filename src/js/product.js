//the purpose for this entire file is to obtain and pass along the 'product' ID, gathered from the URL when viewing an individual product page.
import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { setCartSuperscriptHTML } from "./productDetails.mjs";

//const productId = getParam("product");
//productDetails(productId);

// Call getParams to retrieve all parameters
const params = getParam();
// Access the 'product' parameter directly from the params object
const productId = params["product"];
const category = params["category"];
// Call productDetails with the productId
productDetails(productId, category);

loadHeaderFooter();
setTimeout(() => setCartSuperscriptHTML(), 100);
