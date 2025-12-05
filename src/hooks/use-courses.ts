import { useQuery } from "@tanstack/react-query";
import { coursesApi, Course } from "@/api/courses";

export const useCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: coursesApi.getAll,
  });
};

export const useCourse = (id: string) => {
  return useQuery<Course>({
    queryKey: ["courses", id],
    queryFn: () => coursesApi.getById(id),
    enabled: !!id,
  });
};

export const useCoursesByCategory = (category: string) => {
  return useQuery<Course[]>({
    queryKey: ["courses", "category", category],
    queryFn: () => coursesApi.getByCategory(category),
    enabled: !!category,
  });
};

export const useFeaturedCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses", "featured"],
    queryFn: coursesApi.getFeatured,
  });
};

export const useSearchCourses = (query: string) => {
  return useQuery<Course[]>({
    queryKey: ["courses", "search", query],
    queryFn: () => coursesApi.search(query),
    enabled: !!query,
  });
};
