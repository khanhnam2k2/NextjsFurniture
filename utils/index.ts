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

interface dataAddToCartProps {
  userId: string;
  productId: string;
  price: string;
  quantity: number;
}

export const addToCart = async (data: dataAddToCartProps) => {
  try {
    const response = await axiosClient.post("/api/cart/addToCart", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCartList = async (userId: string | null) => {
  try {
    const response = await axiosClient.get("/api/cart/" + userId);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (token: string) => {
  try {
    const response = await axiosClient.get("/api/user/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantityInCart = async (
  userId: string,
  itemId: string,
  quantity: number
) => {
  try {
    const response = await axiosClient.put("/api/cart/update", {
      userId,
      itemId,
      quantity,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemInCart = async (userId: string, itemId: string) => {
  try {
    const response = await axiosClient.delete(
      "/api/cart/delete/" + userId + "/" + itemId
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
