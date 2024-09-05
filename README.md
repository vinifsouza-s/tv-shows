# TVmaze Series Viewer

O TVmaze Series Viewer é uma aplicação React que permite buscar, visualizar e explorar séries de TV utilizando a API do TVmaze. Inclui funcionalidades de pesquisa, visualização de detalhes das séries por temporadas.

## 🚀 Começando

Estas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão 14 ou superior)
- npm ou yarn

### 🔧 Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/usuario/projeto.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd projeto
    ```

3. Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

4. Execute o servidor de desenvolvimento:
    ```bash
    npm start
    # ou
    yarn start
    ```

5. Abra o navegador e acesse `http://localhost:3000` para ver o projeto em execução.

## ⚙️ Executando os Testes

Para executar os testes automatizados, utilize:

```bash
npm test
# ou
yarn test
```

## Estrutura Geral

- **`/src`**:
  - **`/assets`**: Imagens e outros arquivos estáticos que são usados na aplicação.
  - **`/components`**: Componentes React organizados por nível de abstração.
    - **`/atoms`**: Componentes atômicos, como botões e inputs.
    - **`/molecules`**: Componentes moleculares, como formulários e cards.
    - **`/organisms`**: Componentes orgânicos, como listas e modais.
  - **`/hooks`**: Hooks personalizados para lógica de estado e efeitos.
  - **`/pages`**: Páginas e vistas principais da aplicação.
  - **`/services`**: Serviços para interagir com APIs e lógica de negócios.
  - **`/styles`**: Estilos globais e temas em SCSS.
  - **`/types`**: Tipos e interfaces TypeScript.
  - `App.tsx`: Componente principal que define a estrutura da aplicação.
  - `index.tsx`: Ponto de entrada da aplicação.
  - `setupTests.ts`: Configurações para os testes.

### 🔩 Analise os testes de ponta a ponta

- **Testes Unitários**: Utiliza Jest para realizar testes unitários dos componentes e hooks da aplicação, garantindo a funcionalidade correta e a integridade do código.
  - **Testes de Componentes**: Verificam a renderização correta e a interação dos componentes, como `SeriesList`, `SeriesDetailsModal`, `SeriesCards`, e `EpisodeItemCard`.
  - **Testes de Hooks**: Incluem a verificação do comportamento dos hooks `useSeries` e `useLoading`.

Os testes automatizados utilizam Jest e Testing Library para garantir a funcionalidade e a integridade do projeto. Aqui está uma visão geral dos tipos de testes implementados:

• Testes de Funções Utilitárias:

  1.Verificam a lógica das funções utilitárias. Por exemplo, um teste pode garantir que uma função que remove tags HTML retorna apenas o texto puro.

```
test('should remove all HTML tags from a string', () => {
    const htmlString = '<div><p>Hello <b>world</b></p></div>';
    const result = stripHtmlTags(htmlString);
    expect(result).toBe('Hello world');
});
```

 2.Testes de Componentes:

```
test('should render the episode image and name', () => {
    render(<EpisodeItemCard episode={mockEpisode} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'image-url');
    expect(screen.getByText('1-1 Episode Name')).toBeInTheDocument();
});
```

3.Testes de Integração:

```
test('should display the series details modal when a series is selected', () => {
    render(<SeriesList />);
    expect(screen.getByText('Series Details')).toBeInTheDocument();
});
```

## Serviços Criados

1. **`fetchSeries`**
   - **Descrição**: Função para buscar séries com base em um termo de pesquisa e na página atual.
   - **Requisição**: 
     - Pesquisa: `GET /search/shows?q={query}`
     - Paginação: `GET /shows?page={page}`
   - **Tratamento de Erro**: Usa `react-toastify` para exibir uma mensagem de erro se a requisição falhar.

2. **`fetchSeriesDetails`**
   - **Descrição**: Função para buscar detalhes de uma série específica, incluindo episódios.
   - **Requisição**: `GET /shows/{id}?embed=episodes`
   - **Tratamento de Erro**: Usa `react-toastify` para exibir uma mensagem de erro se a requisição falhar.

## Requisições Implementadas

- **Busca de Séries**: Permite buscar séries com base em um termo de pesquisa através da API do TVmaze.
- **Detalhes da Série**: Recupera detalhes de uma série específica, incluindo episódios e informações adicionais.
- **Paginação**: Permite navegar entre páginas de resultados da lista de séries, com controle de navegação para avançar e retroceder páginas.

## Responsabilidades dos Componentes

1. **`SeriesList`**
   - **Responsabilidade**: Gerencia a lista de séries, realiza pesquisas, exibe resultados e controles de paginação.
   - **Interação com Hooks**: Usa o hook `useSeries` para obter dados e manipular a pesquisa e a navegação.

2. **`SeriesDetailsModal`**
   - **Responsabilidade**: Exibe detalhes da série selecionada em um modal.
   - **Interação com Props**: Recebe a série selecionada e funções de controle do modal.

3. **`SeriesCards`**
   - **Responsabilidade**: Renderiza um cartão de série com informações básicas e uma imagem.
   - **Interação com Props**: Recebe os dados da série e uma função de clique.

4. **`EpisodeItemCard`**
   - **Responsabilidade**: Exibe informações sobre um episódio específico.
   - **Interação com Props**: Recebe os dados do episódio para renderização.

5. **`LoadingOverlay`**
   - **Responsabilidade**: Exibe um indicador de carregamento sobre a interface enquanto os dados estão sendo carregados.

## Gestão de Temas

- **Temas Claro e Escuro**: A aplicação suporta temas claro e escuro, gerenciados através de um `ThemeToggle` para alternar entre eles.

📝 Contribuindo

•  Fique a vontade para contribuir !

