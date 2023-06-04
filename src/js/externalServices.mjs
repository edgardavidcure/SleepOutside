const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

<<<<<<< HEAD:src/js/productData.mjs
export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
=======
export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `/products/search/${category}`);
>>>>>>> ca898d1003396d9abe4f9063e59b176ae2b0d824:src/js/externalServices.mjs
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const product = await fetch(baseURL + `product/${id}`);
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
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}