import { useQuery } from "@tanstack/react-query";
import { categoriesApi, Category } from "@/api/categories";

export const useCategories = () => {
  return [];
};

export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ["categories", id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
};
