

import React from 'react';
import { useSeries } from '../../../hooks/useSeries';
import SeriesDetailsModal from '../../molecules/SeriesDetailsModal';

import './styles.scss';
import SeriesCards from '../../molecules/SeriesCards';


const SeriesList: React.FC = () => {
    const { series, selectedSeries, loading, error, handleSeriesClick, handleCloseModal } = useSeries();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <div className="series-list">
                {series.map(s => (
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
                ))}
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
