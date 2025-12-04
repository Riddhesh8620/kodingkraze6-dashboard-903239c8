export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  category: string;
  description?: string;
  lessons?: number;
}

const BASE_URL = '/api';

export const coursesApi = {
  getAll: async (): Promise<Course[]> => {
    const response = await fetch(`${BASE_URL}/courses`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  },

  getById: async (id: string): Promise<Course> => {
    const response = await fetch(`${BASE_URL}/courses/${id}`);
    if (!response.ok) throw new Error('Failed to fetch course');
    return response.json();
  },

  getByCategory: async (category: string): Promise<Course[]> => {
    const response = await fetch(`${BASE_URL}/courses?category=${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Failed to fetch courses by category');
    return response.json();
  },

  getFeatured: async (): Promise<Course[]> => {
    const response = await fetch(`${BASE_URL}/courses/featured`);
    if (!response.ok) throw new Error('Failed to fetch featured courses');
    return response.json();
  },

  search: async (query: string): Promise<Course[]> => {
    const response = await fetch(`${BASE_URL}/courses/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search courses');
    return response.json();
  },
};
