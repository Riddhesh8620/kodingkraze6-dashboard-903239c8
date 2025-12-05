import { useQuery } from "@tanstack/react-query";
import { categoriesApi, Category } from "@/api/categories";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: categoriesApi.getAll,
  });
};

export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ["categories", id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
};
