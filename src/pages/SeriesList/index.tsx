import { useEffect, useState } from 'react';


import './styles.scss';
import { fetchSeries } from '../../services/api';

const SeriesList = () => {
    const [series, setSeries] = useState<any[]>([]);

    useEffect(() => {
        const getSeries = async () => {
            try {
                const data = await fetchSeries();
                setSeries(data);
            } catch (error) {
                console.log(`Erro ao buscar séries: ${error}`);
            }
        };
        getSeries();
    }, []);

    return (
        <div className="container">

            <div className="series-list">
                {series.map(s => (
                    <div key={s.id} className="series-item">
                        <img src={s.image.medium} alt={s.name} />
                        <h2>{s.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeriesList;
