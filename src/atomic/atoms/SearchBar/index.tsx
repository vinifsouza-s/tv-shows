import React, { useState, useEffect } from 'react';
import './styles.scss';

interface SearchBarProps {
    inputValue: string;
    onSearch: (query: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, onSearch, onClear }) => {
    const [localValue, setLocalValue] = useState(inputValue);
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        setLocalValue(inputValue);
    }, [inputValue]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(localValue);
        }, 1200);

        return () => {
            clearTimeout(handler);
        };
    }, [localValue]);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(event.target.value);
    };

    const handleClear = () => {
        setLocalValue('');
        onClear();
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Digite para localizar a série"
                value={localValue}
                onChange={handleInputChange}
            />
            <button onClick={handleClear} disabled={!localValue}>
                Limpar Pesquisa
            </button>
        </div>
    );
};

export default SearchBar;
