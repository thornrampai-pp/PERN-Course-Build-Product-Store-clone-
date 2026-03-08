import api from "./axios";

// users api
export const syncUser = async (userData) => {
  const { data } = await api.post("/users/sync", userData);
  return data.data;
};

// product api

export const getAllProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};


export const getMyProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};


export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async ({id,...productData}) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProducts = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};


// comment

export const createComment = async ({productId,content}) => {
  const { data } = await api.post(`/comments/${productId}`, content);
  return data;
};



export const deleteComment = async ({commentId}) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};
