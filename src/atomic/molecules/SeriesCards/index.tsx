

import React from 'react';
import './styles.scss';
import { SeriesProps } from '../../../types/Series';

interface SeriesCardsProps {
    series: Pick<SeriesProps, 'id' | 'name' | 'image'>;
    onClick: () => void;
}

const SeriesCards: React.FC<SeriesCardsProps> = ({ series, onClick }) => (

    <div className="series-item" onClick={onClick}>
        <img src={series.image.medium} alt={series.name} />
        <h2>{series.name}</h2>
    </div>
);

export default SeriesCards;
