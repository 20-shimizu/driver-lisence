import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');

      try {
        const response = await fetch('http://localhost:8000/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // トークン削除
    localStorage.removeItem('username'); // ユーザー名削除
    navigate('/'); // ログイン画面に移行
  };

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!userData) {
    return <p className="loading-message">Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">プロフィール</h1>
      <p className="profile-info">
        名前: <span>{userData.userName}</span>
      </p>
      <p className="profile-info">
        年齢: <span>{userData.age}</span>
      </p>
      <button className="logout-button" onClick={handleLogout}>ログアウト</button>
    </div>
  );
}

export default UserProfile;
