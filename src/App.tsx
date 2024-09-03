import React from 'react';

import './styles/global.scss';
import RoutesConfig from './routes';

const App: React.FC = () => {
  return (
    <div className="app">
      <RoutesConfig />
    </div>
  );
};

export default App;