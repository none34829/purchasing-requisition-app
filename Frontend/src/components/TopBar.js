import React, { useState } from 'react';
import axios from 'axios';
import './TopBar.css';

const TopBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 2) {
      try {
        const response = await axios.get('/api/products', {
          params: { query: event.target.value },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }
  };

  return (
    <div className="top-bar">
      <div className="search-container">
        <span className="search-icon">&#128269;</span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Good Morning Sanjay. Would you like to place a new request?"
        />
      </div>
      <div className="suggestions">
        {suggestions.map((suggestion, index) => (
          <div key={index}>{suggestion.name}</div>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
