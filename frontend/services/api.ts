import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

//controls

export const controlsApi = {
  getAll: async (
    page = 1,
    pageSize = 10
  ) => {
    const res = await api.get(
      `/controls?page=${page}&page_size=${pageSize}`
    );
  
    return res.data;
  },

  getById: async (id: number) => {
    const res = await api.get(`/controls/${id}`);
    return res.data;
  },

  create: async (data: any) => {
    const res = await api.post("/controls", data);
    return res.data;
  },

  update: async (
    id: number,
    data: any
  ) => {
    const res = await api.put(
      `/controls/${id}`,
      data
    );

    return res.data;
  },

  delete: async (id: number) => {
    const res = await api.delete(
      `/controls/${id}`
    );

    return res.data;
  },

  search: async (query: string) => {
    const res = await api.get(
      `/controls/search?q=${query}`
    );

    return res.data;
  },

  nextId: async () => {
    const res = await api.get(
      "/controls/next-id"
    );

    return res.data;
  },
};