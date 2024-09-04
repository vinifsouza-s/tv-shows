import React, { useEffect, useState } from 'react';
import './styles.scss';
import Modal from '../../atoms/Modal';
import { stripHtmlTags } from '../../../utils/scriptHtml';
import EpisodeItemCard from '../EpisodesCard';
import { EpisodeProps } from '../../../types/Episode';
import { SeriesProps } from '../../../types/Series';


interface SeriesDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    series: SeriesProps;
}

const SeriesDetailsModal: React.FC<SeriesDetailsModalProps> = ({ isOpen, onClose, series }) => {
    const [selectedSeason, setSelectedSeason] = useState<number>(1);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!series) return null;

    const getEpisodesForSeason = (season: number): EpisodeProps[] => {
        return series._embedded?.episodes.filter((episode: EpisodeProps) => episode.season === season);
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="series-details-modal">
                <button className="close-button" onClick={onClose} aria-label="Close modal">&times;</button>
                <h2>{series.name}</h2>
                <div className='divider_header'>
                    <img src={series.image.original} alt={series.name} className='primary_image' />
                    <div className='sumary'>
                        <p>{stripHtmlTags(series.summary)}</p>
                        <p><strong>Premiere:</strong> {series.premiered}</p>
                        <p><strong>Genres:</strong> {series.genres?.join(', ')}</p>
                    </div>
                </div>

                <div className="season-selector">
                    <label htmlFor="season-select">Select Season:</label>
                    <select
                        id="season-select"
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    >
                        {Array.from({ length: series.ended ? series._embedded.episodes.reduce((max: number, episode: any) => Math.max(max, episode.season), 0) : 1 }, (_, i) => i + 1)
                            .map(season => (
                                <option key={season} value={season}>Season {season}</option>
                            ))}
                    </select>
                </div>

                <div className="episodes-list">
                    {getEpisodesForSeason(selectedSeason)?.map((episode: any) => (
                        <EpisodeItemCard key={episode.id} episode={episode} />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default SeriesDetailsModal;
