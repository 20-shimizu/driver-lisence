import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { getUserMeUsersMeGet } from '../api/fastAPISample';

export default function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                setError('ログイン情報がありません。ログインしてください');
                navigate('/');
                return;
            }

            try {
                const options = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const data = await getUserMeUsersMeGet(options);

                setUserData(data.data);
            } catch (err) {
                setError(err.response?.data?.detail || 'ユーザー情報の取得に失敗しました');
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

            <Link to="/EmailSendFrom">家族の情報登録へ</Link>
            <Link to="/LoginForm" className="btn btn--purple">ログイン</Link>
            <Link to="/UserRegistration" className="btn btn--pink">ユーザー登録</Link>
            <Link to="/" className="btn btn--yellow">メニュー画面に戻る</Link>

        </div>
    );
}
