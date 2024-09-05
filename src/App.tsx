
import React, { useState } from 'react';
import './styles/global.scss';
import RoutesConfig from './routes';
import ThemeToggle from './atomic/atoms/ThemeToggle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={isDarkMode ? 'theme-dark' : 'theme-light'}>
      <div className="app-container">
        <header className="app-header">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </header>
        <main>
          <ToastContainer />
          <RoutesConfig />
        </main>
      </div>
    </div>
  );
};

export default App;
