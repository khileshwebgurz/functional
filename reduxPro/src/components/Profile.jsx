import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/profile', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
    onLogout();
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
