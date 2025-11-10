import { api } from "./api";

export const getDogFacts = async () => {
  const response = await api.get("/facts");
  return response.data;
};