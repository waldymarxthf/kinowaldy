import api from "./config";

export async function searchFilms({ query = "", limit = 5, page = 1 }) {
  const response = await api.get(`/v1.4/movie/search`, {
    params: { page, limit, query },
  });
  return response.data;
}
