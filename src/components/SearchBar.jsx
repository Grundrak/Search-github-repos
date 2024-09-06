import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

function SearchBar({ setUsername, className }) {
  const [input, setInput] = useState();

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      // If the search term is empty, use 'Grundrak'
      setUsername(searchTerm.trim() || 'Grundrak');
    }, 300),
    [setUsername]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };

  return (
    <div className={`${className} px-4`}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search GitHub username..."
        className="w-full p-3 rounded-full bg-accent shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default SearchBar;