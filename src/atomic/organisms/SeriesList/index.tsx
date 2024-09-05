// components/SeriesList/index.tsx
import React, { useState } from 'react';
import { useSeries } from '../../../hooks/useSeries';
import SeriesDetailsModal from '../../molecules/SeriesDetailsModal';
import SeriesCards from '../../molecules/SeriesCards';
import './styles.scss';
import SearchBar from '../../atoms/SearchBar';
import { SeriesProps, SearchResultProps } from '../../../types/Series';

const SeriesList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { series, selectedSeries, loading, error, handleSeriesClick, handleCloseModal } = useSeries(searchQuery);

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <SearchBar onSearch={setSearchQuery} onClear={handleClearSearch} />

            <div className="series-list">
                {series.length > 0 ? (
                    series.map((item: SearchResultProps | SeriesProps) => {
                        const show = 'show' in item ? item.show : item;
                        return (
                            <SeriesCards
                                key={show.id}
                                series={{
                                    id: show.id,
                                    name: show.name,
                                    image: {
                                        medium: show.image?.medium || 'default-image-url'
                                    },
                                }}
                                onClick={() => handleSeriesClick(show.id)}
                            />
                        );
                    })
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
