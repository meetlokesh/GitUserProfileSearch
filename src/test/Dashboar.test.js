// src/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders navigation links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Search')).toBeInTheDocument();
  expect(screen.getByText('History')).toBeInTheDocument();
});

test('navigates to Search page', () => {
  render(
    <MemoryRouter initialEntries={['/search']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Search GitHub User')).toBeInTheDocument();
});

test('navigates to History page', () => {
  render(
    <MemoryRouter initialEntries={['/history']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Search History')).toBeInTheDocument();
});

// src/pages/Search.test.js
import Search from './pages/Search';

test('renders search input and button', () => {
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText('Enter GitHub username')).toBeInTheDocument();
  expect(screen.getByText('Search')).toBeInTheDocument();
});

// src/pages/History.test.js
import History from './pages/History';

test('renders history page', () => {
  localStorage.setItem('searchHistory', JSON.stringify([{ username: 'testuser', success: true }]));
  render(
    <MemoryRouter>
      <History />
    </MemoryRouter>
  );
  expect(screen.getByText('testuser')).toBeInTheDocument();
  expect(screen.getByText('Success')).toBeInTheDocument();
});

// src/pages/UserProfile.test.js
import UserProfile from './pages/UserProfile';

test('fetches and displays user profile', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        login: 'testuser',
        avatar_url: 'testurl',
        bio: 'test bio',
        public_repos: 10,
        followers: 5,
        following: 2,
      }),
    })
  );

  render(
    <MemoryRouter initialEntries={['/user/testuser']}>
      <UserProfile />
    </MemoryRouter>
  );

  expect(await screen.findByText('testuser')).toBeInTheDocument();
  expect(await screen.findByText('Bio: test bio')).toBeInTheDocument();
  global.fetch.mockClear();
});
