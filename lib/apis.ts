import Axios from "axios";

import { comments, generalComments } from "./DUMMY_DATA";
import { ICartObject, IComment, IProduct } from "./types";

const axios = Axios.create({
  baseURL: "https://fakestoreapi.com",
});

// API CALL TO GET ALL PRODUCTS
export const getProducts = async (category?: string, limit?: number) => {
  try {
    const { data: response } = await axios.get(
      `/products${category ? `/category/${category}` : ""}?limit=${limit}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// API CALL TO GET LATEST PRODUCTS ADDED TO DATABASE
export const getLatestProducts = async () => {
  try {
    const { data: response } = await axios.get("/products?limit=4&sort=desc");
    return response;
  } catch (error) {
    throw error;
  }
};

// API CALL SAMULATE TO GET TOP SELLED PRODUCTS
export const getTopSellingProducts = async () => {
  try {
    const { data: response } = await axios.get("/products?limit=10&sort=desc");
    const handledData = response.map((product: IProduct) => ({
      ...product,
      topSale: Math.random() >= 0.5,
    }));
    const TopSellingProducts = handledData.filter(
      (product: IProduct & { topSale: boolean }) => product.topSale,
    );
    return TopSellingProducts.slice(0, 4);
  } catch (error) {
    throw error;
  }
};

//API CALL TO GET PRODUCT BY ID AND ADDING DUMMY COMMENTS
export const getProductById = async (id: number) => {
  try {
    const { data: response }: { data: IProduct } = await axios.get(
      `/products/${id}`,
    );
    const handledData = {
      ...response,
      comments: generalComments,
    };
    return handledData;
  } catch (error) {
    throw error;
  }
};

// API TO ADD PRODUCT TO CART
export const addProductToCart = async (cartObject: ICartObject) => {
  try {
    const { data: response } = await axios.post("/carts", cartObject);
    return response;
  } catch (error) {
    throw error;
  }
};

// API TO GET ALL CATEGORIES
export const getCategories = async () => {
  try {
    const { data: response }: { data: string[] } = await axios.get(
      "/products/categories",
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//APITO GET IN SPECIFIC CATEGORIES
export const getProductsByCategory = async (category: string) => {
  try {
    const { data: response } = await axios.get(
      `/products/category/${category}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// DUMMY CALL API FOR COMMENTS
export const getComments = async () => {
  return new Promise<IComment[]>((resolve) => {
    setTimeout(() => {
      resolve(comments);
    }, 5000);
  });
};
