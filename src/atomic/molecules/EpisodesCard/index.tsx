import React from 'react';
import { stripHtmlTags } from '../../../utils/scriptHtml';
import './styles.scss';
import { EpisodeProps } from '../../../types/Episode';

import defaultImage from '../../../assets/image/No_image_available.svg.png';

interface EpisodeItemProps {
    episode: EpisodeProps;
}

const EpisodeItemCard: React.FC<EpisodeItemProps> = ({ episode }) => {
    const imageUrl = episode.image?.medium || defaultImage;

    return (
        <div className="episode-item">
            <img
                src={imageUrl}
                alt={episode.name || 'Imagem do episódio'}
                className={episode.image?.medium ? 'image' : 'default-image'}
            />
            <div className="episode-info">
                <h4>{episode.season}-{episode.number}{'  '}{episode.name}</h4>
                <p>{stripHtmlTags(episode.summary)}</p>
                <p><strong>Runtime:</strong> {episode.runtime} minutes</p>
            </div>
        </div>
    );
};

export default EpisodeItemCard;
