// this file basically returns the 'object' for a specific product Id

const baseURL = import.meta.env.VITE_SERVER_URL;
//VITE_SERVER_URL=http://server-nodejs.cit.byui.edu:3000/

async function convertToJson(res) {
  try {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw { name: "servicesError", message: data };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(baseURL + "checkout/", options).then(convertToJson);
    return response;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
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
    throw error;
  }
}

export async function getOrders(token) {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseURL + "orders", options).then(convertToJson);
    return response;
  } catch (error) {
    console.error("Error in getOrders:", error);
    throw error;
  }
}
