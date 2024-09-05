const API_URL = "https://api.tvmaze.com";

export const fetchSeries = async (query: string = "", page: number = 0) => {
  try {
    const url = query
      ? `${API_URL}/search/shows?q=${encodeURIComponent(query)}`
      : `${API_URL}/shows?page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.slice(0, 40);
  } catch (error: any) {
    console.log(`Erro ao buscar séries: ${error.message}`);
    throw new Error(`Erro ao buscar séries: ${error.message}`);
  }
};
export const fetchSeriesDetails = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/shows/${id}?embed=episodes`);
    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes da série");
    }
    return await response.json();
  } catch (error: any) {
    console.log(`Erro ao buscar detalhes da série: ${error.message}`);
    throw new Error(`Erro ao buscar detalhes da série: ${error.message}`);
  }
};
