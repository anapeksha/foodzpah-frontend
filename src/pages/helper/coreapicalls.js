import { API } from "../../uri";

export const getProductsLimit = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
