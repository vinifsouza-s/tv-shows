import React, { useState, useEffect } from 'react';
import { useSeries } from '../../../hooks/useSeries';
import SeriesDetailsModal from '../../molecules/SeriesDetailsModal';
import SeriesCards from '../../molecules/SeriesCards';
import './styles.scss';
import SearchBar from '../../atoms/SearchBar';

const SeriesList: React.FC = () => {
    const { series, selectedSeries, loading, error, handleSeriesClick, handleCloseModal } = useSeries();
    const [filteredSeries, setFilteredSeries] = useState(series);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSeries(series);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = series.filter(s =>
                s.name.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredSeries(filtered);
        }
    }, [searchQuery, series]);

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredSeries(series);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <SearchBar onSearch={setSearchQuery} onClear={handleClearSearch} />

            <div className="series-list">
                {filteredSeries.length > 0 ? (
                    filteredSeries.map(s => (
                        <SeriesCards
                            key={s.id}
                            series={{
                                id: s.id,
                                name: s.name,
                                image: {
                                    medium: s.image.medium
                                },
                            }}
                            onClick={() => handleSeriesClick(s.id)}
                        />
                    ))
                ) : (
                    <p>Nenhuma série encontrada para "{searchQuery}"</p>
                )}
            </div>

            {selectedSeries && (
                <SeriesDetailsModal
                    isOpen={true}
                    onClose={handleCloseModal}
                    series={selectedSeries}
                />
            )}
        </div>
    );
};

export default SeriesList;
