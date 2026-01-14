import { useQuery } from "@tanstack/react-query";
import { Category } from "@/api/categories";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => {
      return fetch('/api/categories', {
        headers: { 'Content-Type': 'application/json' },
      }).then(response => {
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
      });
    },
  });
};

export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ["categories", id],
    queryFn: () => {
      return fetch(`/api/categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch category');
          return response.json();
        });
    },
    enabled: !!id,
  });
};
