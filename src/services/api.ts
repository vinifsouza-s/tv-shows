const API_URL = "https://api.tvmaze.com";

export const fetchSeries = async () => {
  try {
    const response = await fetch(`${API_URL}/shows`);
    return await response.json();
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
