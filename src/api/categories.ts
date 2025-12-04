export interface Category {
  id: string;
  name: string;
  icon: string;
  courseCount: number;
  color: string;
  description?: string;
}

const BASE_URL = '/api';

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  getById: async (id: string): Promise<Category> => {
    const response = await fetch(`${BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },
};
