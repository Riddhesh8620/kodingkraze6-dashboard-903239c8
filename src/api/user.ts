export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  purchasedCourses: string[];
  createdAt: string;
}

export interface PurchaseRequest {
  courseId: string;
  paymentMethod: string;
}

export interface PurchaseResponse {
  success: boolean;
  transactionId: string;
  message: string;
}

const BASE_URL = '/api';

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await fetch(`${BASE_URL}/user/profile`);
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
  },

  getPurchasedCourses: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/user/purchased-courses`);
    if (!response.ok) throw new Error('Failed to fetch purchased courses');
    return response.json();
  },

  purchaseCourse: async (data: PurchaseRequest): Promise<PurchaseResponse> => {
    const response = await fetch(`${BASE_URL}/user/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to purchase course');
    return response.json();
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },
};
