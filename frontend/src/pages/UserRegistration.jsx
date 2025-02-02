import React, { useState } from "react";
import {
  useCreateUserUsersRegisterPost,
  useLoginAccessTokenAuthLoginPost,
} from "../api/fastAPISample";
import { useNavigate, Link } from "react-router-dom";
import "./UserRegistration.css";

export default function UserRegistrationForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const createUserMutation = useCreateUserUsersRegisterPost();
  const loginMutation = useLoginAccessTokenAuthLoginPost();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || age === "" || password === "") {
      setErrorMessage("全ての項目を入力してください");
      return;
    }

    if (age < 18) {
      setErrorMessage("18歳未満の方は登録できません");
      return;
    }
    
    createUserMutation.mutate(
      {
        data: {
          user_name: name,
          age: parseInt(age, 10),
          password: password,
        },
      },
      {
        onSuccess: () => {
          // ユーザー登録成功時にログイン処理を実行
          loginMutation.mutate(
            {
              data: {
                username: name,
                password: password,
              },
            },
            {
              onSuccess: (response) => {
                // ログイン成功時にトークンを保存してリダイレクト
                localStorage.setItem(
                  "access_token",
                  response.data.access_token
                );
                setName("");
                setAge("");
                setPassword("");
                setErrorMessage("");
                navigate("/"); // ホームページなど適切な場所にリダイレクト
              },
              onError: (error) => {
                console.error("ログイン失敗", error);
                setErrorMessage("ログインに失敗しました。再度お試しください。");
              },
            }
          );
        },
        onError: (error) => {
          console.error("登録失敗", error);
          setErrorMessage("登録に失敗しました");
        },
      }
    );
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2 className="registration-title">ユーザー登録</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              ユーザー名
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="ユーザー名を入力"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age" className="form-label">
              年齢
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-input"
              placeholder="年齢を入力"
              min="18" // 入力値の最小値を18に設定
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="パスワードを入力"
              required
            />
          </div>
          {errorMessage && <p className="message error">{errorMessage}</p>}
          <div className="form-button-container">
            <button type="submit" className="btn btn--green">
              登録
            </button>
            <Link to="/" className="btn btn--purple">
              戻る
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
