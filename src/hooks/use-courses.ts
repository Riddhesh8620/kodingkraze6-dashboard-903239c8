import { useQuery } from "@tanstack/react-query";
import { Course } from "@/api/courses";

export const useCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
  });
};

export const useCourse = (id: string) => {
  return useQuery<Course>({
    queryKey: ["courses", id],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${id}`);
      if (!response.ok) throw new Error('Failed to fetch course');
      return response.json();
    },
    enabled: !!id,
  });
};

export const useCoursesByCategory = (category: string) => {
  return useQuery<Course[]>({
    queryKey: ["courses", "category", category],
    queryFn: async () => {
      const response = await fetch(`/api/courses?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
    enabled: !!category,
  });
};

export const useFeaturedCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses", "featured"],
    queryFn: async () => {
      const response = await fetch('/api/courses?featured=true');
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
  });
};

export const useSearchCourses = (query: string) => {
  return useQuery<Course[]>({
    queryKey: ["courses", "search", query],
    queryFn: async () => {
      const response = await fetch(`/api/courses?search=${query}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
    enabled: !!query,
  });
};
