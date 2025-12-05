import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, User, PurchaseRequest } from "@/api/user";

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user", "profile"],
    queryFn: userApi.getProfile,
  });
};

export const usePurchasedCourses = () => {
  return useQuery<string[]>({
    queryKey: ["user", "purchasedCourses"],
    queryFn: userApi.getPurchasedCourses,
  });
};

export const usePurchaseCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: PurchaseRequest) => userApi.purchaseCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "purchasedCourses"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<User>) => userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};
