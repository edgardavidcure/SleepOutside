import { getCookie, getLocalStorage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;
const googleLoginURL = "http://localhost:3000/google";
const ordersURL = "https://wdd330-backend.onrender.com";
async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getMultipleData(categories) {
  const categoriesPromises = categories.map((category) =>
    fetch(baseURL + `/products/search/${category}`)
  );

  const res = await Promise.all(categoriesPromises);

  const data = await Promise.all(
    res.map((productCategoryListPromise) => {
      if (productCategoryListPromise.ok)
        return productCategoryListPromise.json();
    })
  );

  const result = await Promise.all(
    data.map((productData) => productData.Result)
  );

  return result.flat(1);
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `/products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const product = await fetch(baseURL + `/product/${id}`);
  const data = await convertToJson(product);
  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "/checkout/", options).then(convertToJson);
}

export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  return await fetch(baseURL + "/login/", options).then(convertToJson);
}

export async function googleLoginRequest() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await fetch(googleLoginURL, options);
  const json = await convertToJson(data);
  return json;
}

export async function getOrders() {
  const token = getLocalStorage("so-token");
  const url = "https://wdd330-backend.onrender.com";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch(url + "/orders/", options).then(convertToJson);
  return await fetch(baseURL + "/orders/", options).then(convertToJson);
}

export async function getReviewsByProductId(productId) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const data = await fetch(
      `http://localhost:3000/reviews/product/${productId}`,
      options
    );
    const dataToJson = await convertToJson(data);
    console.log("productId:", productId);
    console.log("dataToJson:", dataToJson);
    return dataToJson;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Handle the error or rethrow it if needed
    throw error;
  }
}
export async function addProductReview(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    body: JSON.stringify(Object.fromEntries(data)),
  };

  try {
    const response = await fetch(`http://localhost:3000/reviews/`, options);
    const result = await convertToJson(response);
    return result;
  } catch (error) {
    console.error("Error adding product review:", error);
    // Handle error as needed
  }
}
