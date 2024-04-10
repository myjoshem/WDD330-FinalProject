// this file basically returns the 'object' for a specific product Id

//const fs = require("fs"); will not work in browser (frontend code)
const baseURL = import.meta.env.VITE_SERVER_URL;
//VITE_SERVER_URL=http://server-nodejs.cit.byui.edu:3000/

/* // Function to save data to a JSON file, only works locally, not on frontend
function saveDataToFile(data, filePath) {
  try {
    // Convert the data to JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonData);

    console.log(`Data saved to ${filePath} successfully.`);
  } catch (error) {
    console.error("Error saving data to file:", error);
  }
}
 */
//download a file with json data
async function saveDataToFile(data, fileName) {
  try {
    // Convert the data to JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Create a Blob object containing the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the URL object to release memory
    URL.revokeObjectURL(url);

    console.log(`Data saved to ${fileName} successfully.`);
  } catch (error) {
    console.error("Error saving data to file:", error);
  }
}

export async function convertToJson(res) {
  try {
    const data = await res.json();
    console.log("Response data:", data); // Log response data
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
  const response = await fetch(baseURL + `${category}`);
  const data = await convertToJson(response);

   // Save the retrieved data to a JSON file
  // saveDataToFile(data, "productsByCategory.json");
   
  return data[0].Result;
}

export async function findProductById(id, category) {
  try {
    const response = await fetch(baseURL + `${category}`);
    const data = await convertToJson(response);

    // Check if the response data is an array and has at least one element
    if (Array.isArray(data) && data.length > 0) {
      // Get the 'Result' array from the first element of the response data
      const results = data[0].Result;
      
      // Use the find method to search for the product with the matching 'Id'
      const product = results.find(product => product.Id === id);

      // If a product with the matching Id is found, return it
      if (product) {
        console.log(product);
        return product;
      } else {
        // If no product with the matching Id is found, throw an error
        throw { name: "servicesError", message: `Product with ID ${id} not found in category ${category}` };
      }
    } else {
      // If the response data is not in the expected format, throw an error
      throw { name: "servicesError", message: "Invalid response data format" };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
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
