import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { getUserMeUsersMeGet } from '../api/fastAPISample';

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                setError('ログイン情報がありません。ログインしてください');
                navigate('/login_form');
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
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        navigate('/');
    };

    if (error) {
        return (
            <>
                <p className="error-message">Error: {error}</p>
                <button className="logout-button" onClick={handleLogout}>ログアウト</button>
            </>
        );
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
            <button className="btn btn--red" onClick={handleLogout}>ログアウト</button>
            <Link to="/" className="btn btn--purple">戻る</Link>
        </div>
    );
}

export default UserProfile;
