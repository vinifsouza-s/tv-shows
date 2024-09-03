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
