//this file basically returns the 'object' for a specific product Id

const baseURL = import.meta.env.VITE_SERVER_URL;

async function fetchJson(url) {
  const response = await fetch(url);
  console.log(response);
  if (!response.ok) {
    throw new Error("Bad Response");
  }
  return response.json();
}

/* This function takes a response object (res) as input.
It checks if the response is "ok" (i.e., the status code is in the range 200-299). If so, it returns the JSON representation of the response body using the res.json() method.
If the response is not "ok", it throws an Error with the message "Bad Response". */
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// Fetches data for a specified category
export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;

  // Legacy code just for safe keeping for the time being
  // const url = `../json/${category}.json`;
  // return fetchJson(url);
}

// Finds a product by its ID
// by putting default category, this allows for overriding when new categories are being used
export async function findProductById(id) {
  try {
    // const products = await getData(category);
    // console.log(products);
    const product = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(product);
    console.log(data.Result);
    if (!data.Result) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return data.Result;
  } catch (error) {
    console.error("Error in findProductById:", error);
    throw error; // Re-throw the error to maintain consistent error handling
  }
}
