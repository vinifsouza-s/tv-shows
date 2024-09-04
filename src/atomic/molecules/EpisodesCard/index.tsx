import React from 'react';
import { stripHtmlTags } from '../../../utils/scriptHtml';
import './styles.scss';
import { EpisodeProps } from '../../../types/Episode';


interface EpisodeItemProps {
    episode: EpisodeProps;
}

const EpisodeItemCard: React.FC<EpisodeItemProps> = ({ episode }) => {

    return (
        <div className="episode-item">
            <img src={episode.image.medium} alt={episode.name} />
            <div className="episode-info">
                <h4>{episode.season}-{episode.number}{'  '}{episode.name}</h4>
                <p>{stripHtmlTags(episode.summary)}</p>
                <p><strong>Runtime:</strong> {episode.runtime} minutes</p>
            </div>
        </div>
    );
};

export default EpisodeItemCard;
