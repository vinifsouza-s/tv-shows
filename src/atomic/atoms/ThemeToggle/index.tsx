import React from 'react';
import Switch from 'react-switch';
import { FaSun, FaMoon } from 'react-icons/fa';
import './styles.scss';

const ThemeToggle: React.FC<{ isDarkMode: boolean; onToggle: () => void }> = ({ isDarkMode, onToggle }) => {
    return (
        <div className="theme-toggle">
            <FaSun className={`icon ${!isDarkMode ? 'active' : ''}`} />
            <Switch
                onChange={onToggle}
                checked={isDarkMode}
                offColor="#ccc"
                onColor="#007bff"
                offHandleColor="#fff"
                onHandleColor="#fff"
                handleDiameter={24}
                uncheckedIcon={false}
                checkedIcon={false}
                height={24}
                width={50}
            />
            <FaMoon className={`icon ${isDarkMode ? 'active' : ''}`} />
        </div>
    );
};

export default ThemeToggle;
