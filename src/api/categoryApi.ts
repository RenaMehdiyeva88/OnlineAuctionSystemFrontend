import axiosClient from "./axiosClient";
import type { Category } from "@/models/Category";

const categoryApi = {
  // F8: category options for the browse/search filters and the create-auction form
  getAll: () => axiosClient.get<Category[]>("/categories").then((res) => res.data),
};

export default categoryApi;