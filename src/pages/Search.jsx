import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const user = await response.json();
      const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
      history.push({ username, success: true });
      localStorage.setItem('searchHistory', JSON.stringify(history));
      navigate(`/user/${username}`);
    } catch (err) {
      setError(err.message);
      const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
      history.push({ username, success: false });
      localStorage.setItem('searchHistory', JSON.stringify(history));
    }
  };

  return (
    <div>
      <h1>Search GitHub User</h1>
      <p> enter the username to search the profile</p>
      <input
        className='search-input'
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button class="button-link" onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Search;
