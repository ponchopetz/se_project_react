import checkResponse from "./request.js";

const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://api.choosewtwr.certified.cl"
    : "http://localhost:3001";

const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  return checkResponse(res);
};

const addItem = async (item) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  return checkResponse(res);
};

const deleteItem = async (id) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

const updateUser = async ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
  return checkResponse(res);
};

const addCardLike = async (id) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

const removeCardLike = async (id) => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

export {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
};
