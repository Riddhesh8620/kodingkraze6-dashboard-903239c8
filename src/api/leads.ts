// Lead API interfaces and mock functions

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  course_interest: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadRequest {
  name: string;
  email: string;
  phone: string;
  course_interest: string;
  source: string;
  notes?: string;
}

export interface UpdateLeadRequest {
  id: string;
  status?: Lead["status"];
  notes?: string;
}

// Mock API functions - replace with your actual API endpoints
export const leadsApi = {
  getAll: async (): Promise<Lead[]> => {
    // Replace with actual API call
    const mockLeads: Lead[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210",
        course_interest: "React Development",
        source: "Website",
        status: "new",
        notes: "Interested in weekend batches",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+91 9876543211",
        course_interest: "Data Science",
        source: "Referral",
        status: "contacted",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Mike Wilson",
        email: "mike@example.com",
        phone: "+91 9876543212",
        course_interest: "AWS Certification",
        source: "Social Media",
        status: "qualified",
        notes: "Ready for enrollment",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    return mockLeads;
  },

  create: async (data: CreateLeadRequest): Promise<Lead> => {
    // Replace with actual API call
    const newLead: Lead = {
      id: Date.now().toString(),
      ...data,
      status: "new",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return newLead;
  },

  update: async (data: UpdateLeadRequest): Promise<Lead> => {
    // Replace with actual API call
    return {
      id: data.id,
      name: "Updated Lead",
      email: "updated@example.com",
      phone: "+91 9876543210",
      course_interest: "React Development",
      source: "Website",
      status: data.status || "new",
      notes: data.notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  },

  delete: async (id: string): Promise<void> => {
    // Replace with actual API call
    console.log("Deleting lead:", id);
  },
};
