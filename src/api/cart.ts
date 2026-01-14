import { CartItem } from "@/contexts/CartContext";

export interface CheckoutRequest {
  items: CartItem[];
  totalAmount: number;
  paymentMethod: "qr_code";
  transactionConfirmed: boolean;
}

export interface CheckoutResponse {
  success: boolean;
  orderId: string;
  message: string;
  purchasedItems: string[];
}

const BASE_URL = '/api';

export const cartApi = {
  checkout: async (data: CheckoutRequest): Promise<CheckoutResponse> => {
    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Checkout failed');
    return response.json();
  },

  getOrderHistory: async (): Promise<CheckoutResponse[]> => {
    const response = await fetch(`${BASE_URL}/user/orders`);
    if (!response.ok) throw new Error('Failed to fetch order history');
    return response.json();
  },
};
