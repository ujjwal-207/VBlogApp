export const API_URL = "http://localhost:8000/api";

export const apiClient = {
  get: async (url: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL + url, {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    });
    return res.json();
  },

  post: async (url: string, data: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  put: async (url: string, data: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  delete: async (url: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + url, {
      method: "DELETE",
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    });

    return res.json();
  },
};

