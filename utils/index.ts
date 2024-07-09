const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post("/api/login", { email, password });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProductList = async () => {
  try {
    const response = await axiosClient.get("/api/product");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axiosClient.get("/api/product/" + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (data: any) => {
  try {
    const response = await axiosClient.post("/api/cart/addToCart", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getCartList = async (userId: string) => {
  try {
    const response = await axiosClient.get("/api/cart/" + userId);
    return response;
  } catch (error) {
    console.log(error);
  }
};
