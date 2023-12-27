import customAxios from "@/helpers/customAxios";

// func to get products
const fetchAllProductList = async (limit: number) => {
  return await customAxios(`products?limit=${limit}`);
};
// func to get products detail
const fetchProductDetail = async (id: number) => {
  return await customAxios(`products/${id}`);
};
export { fetchAllProductList, fetchProductDetail };
