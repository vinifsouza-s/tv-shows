import { render, screen, fireEvent } from '@testing-library/react';
import SeriesList from './index';
import { SeriesProps, SearchResultProps } from '../../../types/Series';

jest.mock('../../../hooks/useSeries', () => ({
  useSeries: jest.fn(),
}));

describe('SeriesList Component', () => {
  test('deve renderizar a lista de séries', () => {
    const mockSeries: (SeriesProps | SearchResultProps)[] = [
      {
        id: 1,
        name: 'Serie A',
        summary: 'Summary A',
        premiered: '2020-01-01',
        genres: ['Drama'],
        image: { medium: 'image-url' },
        ended: false,
        _embedded: { episodes: [] }
      },
      {
        id: 2,
        name: 'Serie B',
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

  test('deve exibir "Loading..." enquanto os dados estão sendo carregados', () => {
    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [],
      selectedSeries: null,
      loading: true,
      error: null,
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('deve exibir mensagem de erro quando houver um erro', () => {
    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [],
      selectedSeries: null,
      loading: false,
      error: 'Mensagem de erro genérica.',
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.getByText('Mensagem de erro genérica.')).toBeInTheDocument();
  });

  test('deve exibir o modal de detalhes da série quando uma série estiver selecionada', () => {
    const mockSelectedSeries: SeriesProps = {
      id: 1,
      name: 'Serie C',
      image: { medium: 'image-url' },
      ended: false,
      _embedded: { episodes: [] },
      summary: '',
      premiered: '',
      genres: []
    };

    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [
        { id: 1, name: 'Serie C', image: { medium: 'image-url' }, ended: false, _embedded: { episodes: [] } }
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

  test('deve chamar handleSeriesClick ao clicar em um cartão de série', () => {
    const handleSeriesClick = jest.fn();

    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [
        { id: 1, name: 'Serie D', image: { medium: 'image-url' }, ended: false, _embedded: { episodes: [] } }
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

  test('deve renderizar mensagem quando não há séries após a pesquisa', () => {
    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [],
      selectedSeries: null,
      loading: false,
      error: null,
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });

    render(<SeriesList />);
    expect(screen.getByText('Nenhuma série encontrada para ""')).toBeInTheDocument();
  });

  test('deve exibir mensagem de erro quando houver um erro', () => {

    require('../../../hooks/useSeries').useSeries.mockReturnValue({
      series: [],
      selectedSeries: null,
      loading: false,
      error: 'Mensagem de erro genérica.',
      handleSeriesClick: jest.fn(),
      handleCloseModal: jest.fn(),
    });


    render(<SeriesList />);

    expect(screen.getByText('Mensagem de erro genérica.')).toBeInTheDocument();
  });
});
