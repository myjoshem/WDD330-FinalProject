function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  try {
    const products = await getData();
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
