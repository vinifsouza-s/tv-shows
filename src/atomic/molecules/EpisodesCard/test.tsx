
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
    test('deve remover todas as tags HTML de uma string', () => {
        const htmlString = '<div><p>Hello <b>world</b></p></div>';
        const result = stripHtmlTags(htmlString);
        expect(result).toBe('Hello world');
    });

    test('deve retornar uma string vazia quando não houver conteúdo HTML', () => {
        const htmlString = '';
        const result = stripHtmlTags(htmlString);
        expect(result).toBe('');
    });

    test('deve retornar uma string vazia para HTML sem texto', () => {
        const htmlString = '<div><b></b></div>';
        const result = stripHtmlTags(htmlString);
        expect(result).toBe('');
    });

    test('deve lidar com conteúdo de texto sem tags HTML', () => {
        const htmlString = 'Just plain text';
        const result = stripHtmlTags(htmlString);
        expect(result).toBe('Just plain text');
    });
});


describe('EpisodeItemCard Component', () => {
    test('deve renderizar a imagem do episódio', () => {
        render(<EpisodeItemCard episode={mockEpisode} />);
        expect(screen.getByRole('img')).toHaveAttribute('src', 'image-url');
    });

    test('deve renderizar o nome e número da temporada do episódio', () => {
        render(<EpisodeItemCard episode={mockEpisode} />);
        expect(screen.getByText('1-1 Episode Name')).toBeInTheDocument();
    });

    test('deve renderizar o resumo do episódio sem tags HTML', () => {
        render(<EpisodeItemCard episode={mockEpisode} />);
        expect(screen.getByText('This is a summary of the episode.')).toBeInTheDocument();
    });

    test('deve renderizar o texto "Runtime:" no tempo de execução do episódio', () => {
        render(<EpisodeItemCard episode={mockEpisode} />);
        expect(screen.getByText(/Runtime:/)).toBeInTheDocument();
    });
});
