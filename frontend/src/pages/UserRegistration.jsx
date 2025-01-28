import React, { useState } from 'react';
import './UserRegistrationForm.css'; // ★ 追加
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 入力チェックやバリデーションを行い、問題なければサーバーに送信
    console.log({ name, email, emailConfirm, birthDate, password });
    alert("登録ボタンがクリックされました！");
  };

  return (
    <div className="registration-container">
      {/* カードUIを使いたい場合はラップして使う */}
      <div className="registration-card">
        <h1 className="registration-title">ユーザー登録</h1>
        <form onSubmit={handleSubmit} className="registration-form">

          {/* 名前 */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">名前</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* メールアドレス */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* メールアドレス（確認） */}
          <div className="form-group">
            <label htmlFor="emailConfirm" className="form-label">メールアドレス（確認）</label>
            <input
              id="emailConfirm"
              type="email"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* 生年月日 */}
          <div className="form-group">
            <label htmlFor="birthDate" className="form-label">生年月日</label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* パスワード */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="form-button">
            登録
          </button>
        </form>
      </div>
    </div>
  );
}
