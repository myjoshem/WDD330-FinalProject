import { resolve } from "path";
// eslint-disable-next-line import/namespace
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        categories: resolve(__dirname, "src/product-list/index.html"),
        orders: resolve(__dirname, "src/orders/index.html") /* ,
        login: resolve(__dirname, "src/login/index.html"),
        search: resolve(__dirname, "src/search/index.html"), */,
      },
    },
  },
  // Add the following line to use ESM (ECMAScript Module) build
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
