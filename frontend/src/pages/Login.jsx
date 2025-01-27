// ログイン画面
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginAccessTokenAuthLoginPost } from '../api/fastAPISample';
import './Login.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const loginMutation = useLoginAccessTokenAuthLoginPost({
    mutation: {
      onSuccess: (data) => {
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('username', username);
        setErrorMessage('');
        setSuccessMessage('ログインに成功しました!');
        navigate('/profile');
      },
      onError: (error) => {
        const errorResponse = error.response?.data;
        setSuccessMessage('');
        setErrorMessage(errorResponse?.detail || 'ログインに失敗しました');
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // ページのリロードを防止
    if (username === '' || password === '') {
      setErrorMessage('ユーザー名とパスワードを入力してください');
      return;
    }

    loginMutation.mutate({
      data: {
        grant_type: 'password',
        username,
        password
      },
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">ログイン</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">ユーザー名</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="ユーザー名を入力"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="パスワードを入力"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-button-container">
          <button type="submit" className="form-button">ログイン</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;