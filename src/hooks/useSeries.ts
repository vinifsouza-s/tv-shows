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
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const getSeries = async () => {
      setLoading(true);
      try {
        const data = await fetchSeries(searchQuery, currentPage);
        setSeries(data);
      } catch (error) {
        setError(`Error fetching series: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getSeries();
  }, [searchQuery, currentPage]);

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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return {
    series,
    selectedSeries,
    loading,
    error,
    handleSeriesClick,
    handleCloseModal,
    currentPage,
    handleNextPage,
    handlePrevPage,
  };
};
