import React from 'react';

function History() {
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];

  const clearHistory = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    window.location.reload();
  };

  return (
    <div>
      <h1>Search History</h1>
      <p> Here the last search profiles are shown</p>
      <ul className='search-history'>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.username} - {entry.success ? 'Success' : 'Failed'}
            <button class="button-link" onClick={() => clearHistory(index)}>Clear</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
