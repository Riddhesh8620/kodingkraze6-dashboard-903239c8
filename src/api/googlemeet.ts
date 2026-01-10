const BASE_URL = '/api';

export const google_meetApi = {
  createSpace: async () => {
    const response = await fetch(`${BASE_URL}/google-meeting/create-space`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  },
}