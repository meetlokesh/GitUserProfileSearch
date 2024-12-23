import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import History from './pages/History';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className='search-container'>
        <nav>
          <ul>
            <li>
              <Link class="button-link" to="/">Dashboard</Link>
            </li>
            <li>
              <Link  class="button-link" to="/search">Search</Link>
            </li>
            <li>
              <Link  class="button-link" to="/history">History</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/history" element={<History />} />
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
