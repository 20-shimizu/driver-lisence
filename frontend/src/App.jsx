// APIテスト用
import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // /auth/login に POST リクエストを送る
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.access_token);  // トークンを保存
      console.log('Login successful:', data);
    } else {
      console.error('Login failed');
    }
  };

  const getUserInfo = async () => {
    const response = await fetch('http://localhost:8000/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // トークンを Authorization ヘッダーに設定
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);  // ユーザー情報を設定
    } else {
      console.error('Failed to fetch user info');
    }
  };

  return (
    <div>
      <h1>FastAPI React Demo</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {token && (
        <div>
          <h2>Token: {token}</h2>
          <button onClick={getUserInfo}>Get User Info</button>
        </div>
      )}

      {userInfo && (
        <div>
          <h2>User Info</h2>
          <p>Username: {userInfo.id}</p>
        </div>
      )}
    </div>
  );
};

export default App;
