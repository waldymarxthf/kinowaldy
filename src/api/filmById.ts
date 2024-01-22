import api from "./config";

export async function filmById({ filmId }: { filmId: string }) {
  const response = await api.get(`/v1.4/movie/${filmId}`);
  return response.data;
}
