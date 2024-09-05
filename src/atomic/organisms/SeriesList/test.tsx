import { render, screen, fireEvent } from '@testing-library/react';
import SeriesList from './index';
import { SeriesProps, SearchResultProps } from '../../../types/Series';
import defaultImage from '../../../assets/image/No_image_available.svg.png';

jest.mock('../../../hooks/useSeries', () => ({
  useSeries: jest.fn(),
}));

describe('SeriesList Component', () => {
  test('should render the series list', () => {
    const mockSeries: (SeriesProps | SearchResultProps)[] = [
      {
        id: 1,
        name: 'Series A',
        summary: 'Summary A',
        premiered: '2020-01-01',
        genres: ['Drama'],
        image: { medium: 'image-url' },
        ended: false,
        _embedded: { episodes: [] }
      },
      {
        id: 2,
        name: 'Series B',
        summary: 'Summary B',
        premiered: '2021-02-01',
        genres: ['Comedy'],
        image: { medium: 'image-url' },
        ended: false,
        _embedded: { episodes: [] }
      }
    ];

    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: mockSeries,
      selectedSeries: null,
      loading: false,
      error: null,
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });

  test('should display "Loading..." while data is being loaded', () => {
    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [],
      selectedSeries: null,
      loading: true,
      error: null,
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
  });

  test('should not display "Loading..." when loading is complete', () => {
    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [{ id: 1, name: 'Series A', image: { medium: 'image-url' } }] as SeriesProps[],
      selectedSeries: null,
      loading: false,
      error: null,
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument();
  });

  test('should display an error message when there is an error', () => {
    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [],
      selectedSeries: null,
      loading: false,
      error: 'Generic error message.',
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.getByText('Generic error message.')).toBeInTheDocument();
  });

  test('should display the series details modal when a series is selected', () => {
    const mockSelectedSeries: SeriesProps = {
      id: 1,
      name: 'Series C',
      image: { medium: 'image-url' },
      ended: false,
      _embedded: { episodes: [] },
      summary: '',
      premiered: '',
      genres: []
    };

    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [
        { id: 1, name: 'Series C', image: { medium: 'image-url' }, ended: false, _embedded: { episodes: [] } }
      ],
      selectedSeries: mockSelectedSeries,
      loading: false,
      error: null,
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    const { container } = render(<SeriesList />);

    expect(container.querySelector('.modal-overlay')).toBeInTheDocument();
    expect(container.querySelector('.modal-content')).toBeInTheDocument();
  });

  test('should call handleSeriesClick when a series card is clicked', () => {
    const handleSeriesClick = jest.fn();

    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [
        { id: 1, name: 'Series D', image: { medium: 'image-url' }, ended: false, _embedded: { episodes: [] } }
      ],
      selectedSeries: null,
      loading: false,
      error: null,
      handleSeriesClick,
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    fireEvent.click(screen.getByRole('heading'));
    expect(handleSeriesClick).toHaveBeenCalledWith(1);
  });

  test('should render a message when no series are found after search', () => {
    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [],
      selectedSeries: null,
      loading: false,
      error: null,
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.getByText('No series found for ""')).toBeInTheDocument();
  });

  test('should render the default image when the series image is not available', () => {
    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [
        {
          id: 3,
          name: 'Series E',
          summary: 'Summary E',
          premiered: '2022-03-01',
          genres: ['Action'],
          image: {},
          ended: false,
          _embedded: { episodes: [] }
        }
      ],
      selectedSeries: null,
      loading: false,
      error: null,
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.getByAltText('Series E')).toHaveAttribute('src', defaultImage);
  });
});
