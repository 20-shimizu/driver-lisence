import React, { useState } from 'react';
import './Login.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // ページのリロードを防止
    if (username === '' || password === '') {
      setErrorMessage('ユーザー名とパスワードを入力してください');
    } else {
      setErrorMessage('');
      // ここでログイン処理を行います。例えば、API呼び出しなど
      console.log('ログイン中...');
      console.log('ユーザー名:', username);
      console.log('パスワード:', password);
    }
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
        <div className="form-button-container">
          <button type="submit" className="form-button">ログイン</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
