import checkResponse from "./request.js";

const baseUrl = "http://localhost:3001";

const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  return checkResponse(res);
};

const addItem = async (item) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return checkResponse(res);
};

const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
  return checkResponse(res);
};

export { getItems, addItem, deleteItem };
