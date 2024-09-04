import React, { useState } from 'react';
import './styles.scss';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        onSearch(value);
    };

    const handleClear = () => {
        setInputValue('');
        onClear();
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Digite para localizar a série"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleClear} disabled={!inputValue}>
                Limpar Pesquisa
            </button>
        </div>
    );
};

export default SearchBar;
