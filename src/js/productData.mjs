/* This function takes a response object (res) as input.
It checks if the response is "ok" (i.e., the status code is in the range 200-299). If so, it returns the JSON representation of the response body using the res.json() method.
If the response is not "ok", it throws an Error with the message "Bad Response". */
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Bad Response");
  }
  return response.json();
}

// Fetches data for a specified category (default: "tents")
export async function getData(category = "tents") {
  const url = `../json/${category}.json`;
  return fetchJson(url);
}

// Finds a product by its ID
// by putting default category, this allows for overriding when new categories are being used
export async function findProductById(id, category = "tents") {
  try {
    const products = await getData(category);
    const product = products.find((item) => item.Id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return product;
  } catch (error) {
    console.error("Error in findProductById:", error);
    throw error; // Re-throw the error to maintain consistent error handling
  }
}