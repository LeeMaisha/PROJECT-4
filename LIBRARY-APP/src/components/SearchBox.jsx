import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div>
      <h2>Search Books</h2>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBox;
