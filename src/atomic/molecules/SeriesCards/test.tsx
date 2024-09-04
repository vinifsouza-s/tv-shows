// src/components/SeriesItem.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeriesCards from './';

const mockSeries = {
    id: 1,
    name: 'Under the Dome',
    image: {
        medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
    },
};

const mockOnClick = jest.fn();

describe('SeriesCards Component', () => {
    beforeEach(() => {
        render(<SeriesCards series={mockSeries} onClick={mockOnClick} />);
    });

    it('deve renderizar uma imagem', () => {
        const imgElement = screen.getByRole('img');
        expect(imgElement).toBeInTheDocument();
    });

    it('deve renderizar um texto', () => {
        const h2Element = screen.getByRole('heading', { level: 2 });
        expect(h2Element).toBeInTheDocument();
    });

    it('deve chamar a função onClick quando a div é clicada', () => {
        const divElement = screen.getByText(mockSeries.name).closest('div');
        expect(divElement).toBeInTheDocument();
        fireEvent.click(divElement!);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
