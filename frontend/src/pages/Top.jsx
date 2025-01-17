// トップ画面
import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { Button } from '@mui/material';
<meta name="viewport" content="initial-scale=1, width=device-width" />

const Top = () => {
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
      <h1>トップ画面</h1>

      <div>
        <Button variant="contained" href="<Top>">本日の結果を見る</Button>
      </div>
      <div>
        <Button variant="contained" color="warning">過去の結果を見る</Button>
      </div>
      <div>
        <Button variant="contained" color="success" href="https://www.keishicho.metro.tokyo.lg.jp/menkyo/koshin/jisyu_hennou/index.html">免許返納について</Button>
      </div>
      <div>
        <Button variant="contained" color="error">アプリを終了する</Button>
      </div>

      <Button type="submit">結果を見る</Button>

      {token && (
        <div>
          <h2>Token: {token}</h2>
          <button onClick={getUserInfo}>Get User Info</button>
        </div>
      )}

      {userInfo && (
        <div>
          <h2>User Info</h2>
          <p>user_id: {userInfo.user_id}</p>
        </div>
      )}
    </div>
  );
};

export default Top;
