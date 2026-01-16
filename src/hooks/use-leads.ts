import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leadsApi, Lead, CreateLeadRequest, UpdateLeadRequest } from "@/api/leads";

export const useLeads = () => {
  return useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: leadsApi.getAll,
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateLeadRequest) => leadsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateLeadRequest) => leadsApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => leadsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
};
