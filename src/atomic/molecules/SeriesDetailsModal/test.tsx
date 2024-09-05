import { render, screen } from '@testing-library/react';
import SeriesDetailsModal from './index';

jest.mock('../../atoms/Modal', () => ({
    __esModule: true,
    default: ({ isOpen, onClose, children }: any) => (
        isOpen ? (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        ) : null
    ),
}));

describe('SeriesDetailsModal Component', () => {
    const mockSeries = {
        id: 1,
        name: 'Test Series',
        summary: 'Test summary with HTML',
        premiered: '2022-01-01',
        genres: ['Test Genre'],
        image: { original: 'image-url' },
        ended: false,
        _embedded: {
            episodes: [
                { id: 1, name: 'Test Episode 1', season: 1 },
                { id: 2, name: 'Test Episode 2', season: 1 }
            ]
        }
    };

    test('should render the modal with series details', () => {
        render(
            <SeriesDetailsModal
                isOpen={true}
                onClose={() => { }}
                series={mockSeries as any}
            />
        );

        expect(screen.getByText(/Test Series/i)).toBeInTheDocument();
        expect(screen.getByText(/Test summary with HTML/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Genre/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Episode 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Episode 2/i)).toBeInTheDocument();
    });

    test('should call onClose when the close button is clicked', () => {
        const onClose = jest.fn();

        render(
            <SeriesDetailsModal
                isOpen={true}
                onClose={onClose}
                series={mockSeries as any}
            />
        );

    });
});
