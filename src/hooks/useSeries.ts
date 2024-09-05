// hooks/useSeries.ts
import { useState, useEffect } from "react";
import { fetchSeries, fetchSeriesDetails } from "../services/api";
import { SeriesProps } from "../types/Series";

export const useSeries = (searchQuery: string) => {
  const [series, setSeries] = useState<SeriesProps[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<SeriesProps | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSeries = async () => {
      try {
        const data = await fetchSeries(searchQuery);
        setSeries(data);
      } catch (error) {
        setError(`Error fetching series: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getSeries();
  }, [searchQuery]);

  const handleSeriesClick = async (id: number) => {
    try {
      const data = await fetchSeriesDetails(id);
      setSelectedSeries(data);
    } catch (error) {
      setError(`Error fetching series details: ${error}`);
    }
  };

  const handleCloseModal = () => {
    setSelectedSeries(null);
  };

  return {
    series,
    selectedSeries,
    loading,
    error,
    handleSeriesClick,
    handleCloseModal,
  };
};
