import { useQuery } from "@tanstack/react-query";
import { Category } from "@/api/categories";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    },
  });
};

export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ["categories", id],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${id}`);
      if (!response.ok) throw new Error('Failed to fetch category');
      return response.json();
    },
    enabled: !!id,
  });
};
