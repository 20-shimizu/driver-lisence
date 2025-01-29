import React, { useState, useEffect } from 'react';
import './Top.css';
import { Link } from "react-router-dom";
import { getReportsByUserIdDriveReportsUsersUserIdGet, getUserMeUsersMeGet } from '../api/fastAPISample';

const Top = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
      const fetchUserData = async () => {
        try {
          const options = {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          };
          const data = await getUserMeUsersMeGet(options);
          setUserId(data.data.user_id);
        } catch (err) {
          console.error("ユーザー情報の取得に失敗しました", err);
        }
      };

      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const data = await getReportsByUserIdDriveReportsUsersUserIdGet(userId);
        const count = data.data.filter(item => item.evaluationStatus === 2).length;
        setAlertCount(count);
      } catch (err) {
        setAlertCount(0);
      }
    };

    if (userId !== null) {
      fetchReportData();
    }
  }, [userId]);

  return (
    <div className="top-container">
      <h1 className="top-title">運転診断くん</h1>

      {isLoggedIn ? (
        <>
          {alertCount === 0 ? (
            <Link to="/simple_result" className="btn btn--red">運転結果</Link>
          ) :  (
            <Link to="/alert" className="btn btn--red">運転結果</Link>
          )}
          <Link to="/driving_history" className="btn btn--purple">過去の結果を見る</Link>
          <a href="https://www.keishicho.metro.tokyo.lg.jp/menkyo/koshin/jisyu_hennou/index.html" target="_blank" rel="noopener noreferrer" className="btn btn--yellow">免許返納について</a>
          <Link to="/family_profile" className='btn btn--green'>家族情報登録</Link>
          <Link to="/user_profile" className="btn btn--green">ユーザー情報</Link>
        </>
      ) : (
        <>
          <Link to="/login_form" className="btn btn--red">ログイン</Link>
          <Link to="/user_registration" className="btn btn--purple">ユーザー登録</Link>
        </>
      )}
    </div>
  );
};

export default Top;
