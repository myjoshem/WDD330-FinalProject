//the purpose for this entire file is to obtain and pass along the 'product' ID, gathered from the URL when viewing an individual product page.
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);
