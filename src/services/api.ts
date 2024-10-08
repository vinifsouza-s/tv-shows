import { toast } from "react-toastify";
import { SeriesProps } from "../types/Series";

const API_URL = "https://api.tvmaze.com";

export const fetchSeries = async (query: string = "", page: number = 0) => {
  try {
    let url = "";

    if (query) {
      url = `${API_URL}/search/shows?q=${encodeURIComponent(query)}`;
    } else {
      url = `${API_URL}/shows?page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (query) {
      return data.map((item: { show: SeriesProps }) => item.show);
    }

    return data.slice(0, 40);
  } catch (error: any) {
    toast.error(`Error fetching series: ${error.message}`, {
      position: "top-right",
      autoClose: 5000,
    });
    throw new Error(`Error fetching series: ${error.message}`);
  }
};

export const fetchSeriesDetails = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/shows/${id}?embed=episodes`);
    if (!response.ok) {
      throw new Error("Error fetching series details");
    }
    return await response.json();
  } catch (error: any) {
    toast.error(`Error fetching series details: ${error.message}`, {
      position: "top-right",
      autoClose: 5000,
    });
    throw new Error(`Error fetching series details: ${error.message}`);
  }
};
