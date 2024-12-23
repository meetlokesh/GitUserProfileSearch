import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [username]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.login}</h1>
      <img src={user.avatar_url} alt={user.login} width="100" />
      <p>Bio: {user.bio}</p>
      <p>Public Repos: {user.public_repos}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
    </div>
  );
}

export default UserProfile;
