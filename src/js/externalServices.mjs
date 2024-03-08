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
If the response is not "ok", it throws an Error with the message "Bad Response". 
Team 7 (2) - added try/catch and better error messaging*/
export async function convertToJson(res) {
  try {
    if (res.ok) {
      return await res.json();
    } else {
      const jsonResponse = await res.json();
      throw { name: "servicesError", message: jsonResponse };
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Fetches data for a specified category
export async function getProductsByCategory(category) {
  console.log(baseURL);
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;

  // Legacy code just for safe keeping for the time being
  // const url = `../json/${category}.json`;
  // return fetchJson(url);
}

// export async function getAllProductData() {
//     const response = await fetch(baseURL + `products/search/f`);
//     console.log(response);
//     const data = await convertToJson(response);
//     console.log(data);
//     return data.Result;
// }

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


// Sends chechout data to server
export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(creds) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    };
    const response = await fetch(baseURL + "login", options).then(convertToJson);
    return response.accessToken;
  } catch (error) {
    console.error("Error during login request:", error);
  }
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}

