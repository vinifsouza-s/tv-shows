import { render, screen } from '@testing-library/react';
import EpisodeItemCard from './';
import { EpisodeProps } from '../../../types/Episode';

export const stripHtmlTags = (html: string): string => {
    const temporalDivElement = document.createElement('div');
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || '';
};

const mockEpisode: EpisodeProps = {
    id: 1,
    name: 'Episode Name',
    season: 1,
    number: 1,
    summary: '<p>This is a <b>summary</b> of the episode.</p>',
    image: { medium: 'image-url' },
    runtime: 45,
};

describe('stripHtmlTags', () => {
    test('should remove all HTML tags from a string', () => {
        const htmlString = '<div><p>Hello <b>world</b></p></div>';
        const result = stripHtmlTags(htmlString);
        expect(result).toBe('Hello world');
    });

    test('should return an empty string when there is no HTML content', () => {
        const htmlString = '';
        const result = stripHtmlTags(htmlString);
        expect(result).toBe('');
    });

    test('should return an empty string for HTML with no text', () => {
        const htmlString = '<div><b></b></div>';
        const result = stripHtmlTags(htmlString);
        expect(result).toBe('');
    });

    test('should handle plain text without HTML tags', () => {
        const htmlString = 'Just plain text';
        const result = stripHtmlTags(htmlString);
        expect(result).toBe('Just plain text');
    });
});

describe('EpisodeItemCard Component', () => {
    test('should render the episode image', () => {
        render(<EpisodeItemCard episode={mockEpisode} />);
        expect(screen.getByRole('img')).toHaveAttribute('src', 'image-url');
    });

    test('should render the episode name and season number', () => {
        render(<EpisodeItemCard episode={mockEpisode} />);
        expect(screen.getByText('1-1 Episode Name')).toBeInTheDocument();
    });

    test('should render the episode summary without HTML tags', () => {
        render(<EpisodeItemCard episode={mockEpisode} />);
        expect(screen.getByText('This is a summary of the episode.')).toBeInTheDocument();
    });

    test('should render the text "Runtime:" in the episode runtime', () => {
        render(<EpisodeItemCard episode={mockEpisode} />);
        expect(screen.getByText(/Runtime:/)).toBeInTheDocument();
    });
});
