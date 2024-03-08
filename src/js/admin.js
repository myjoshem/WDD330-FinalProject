import { loadHeaderFooter } from "./utils.mjs";
import Admin from "./admin.mjs";
import { checkLogin } from "./auth.mjs";



loadHeaderFooter();
const admin = new Admin();
admin.showOrders();
checkLogin();

