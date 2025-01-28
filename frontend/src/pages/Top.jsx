import React, { useState, useEffect } from 'react';
import './Top.css';
import { Link } from "react-router-dom";

const Top = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
      console.log(accessToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="top-container">
      <h1 className="top-title">運転診断くん</h1>

      {isLoggedIn ? (
        <>
          <Link to="/SimpleResult" className="btn btn--red">運転結果</Link>
          {/* <Link to="/Alter" className="btn btn--red">運転結果(警告１)</Link> */}
          <Link to="/DrivingHistory" className="btn btn--purple">過去の結果を見る</Link>
          <a href="https://www.keishicho.metro.tokyo.lg.jp/menkyo/koshin/jisyu_hennou/index.html" className="btn btn--yellow">免許返納について</a>
          <Link to="/FamilyProfile" className='btn btn--green'>家族情報登録</Link>
          <Link to="/UserProfile" className="btn btn--green">ユーザー情報</Link>
        </>
      ) : (
        <>
          <Link to="/LoginForm" className="btn btn--red">ログイン</Link>
          <Link to="/UserRegistration" className="btn btn--purple">ユーザー登録</Link>
        </>
      )}
    </div>
  );
};

export default Top;
