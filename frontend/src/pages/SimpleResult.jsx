import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReportsByUserIdDriveReportsUsersUserIdGet, getUserMeUsersMeGet } from '../api/fastAPISample';
import "./SimpleResult.css";

function SimpleResult() {
    const [userId, setUserId] = useState(null);
    const [drivingType, setDrivingType] = useState("");
    const [imagePath, setImagePath] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
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
        }
    }, []);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const data = await getReportsByUserIdDriveReportsUsersUserIdGet(userId);
                const latestData = data.data.at(-1);
                const drivingTypeName = {
                    "1": "急加速・急減速",
                    "2": "急ハンドル",
                    "3": "速度超過",
                    "4": "速度不足",
                    "5": "車間距離不足",
                };
                setDrivingType(drivingTypeName[latestData.drivingType]);
                setImagePath(`/src/assets/${latestData.drivingType}.png`);
            } catch (err) {
                console.log("運転データの取得に失敗しました", err);
            }
        };

        if (userId !== null) {
            fetchReportData();
        }
    }, [userId]);

    return (
        <div className="result-container">
            <h1 className="result-title">本日の結果</h1>
            <h2 className="result-subtitle">本日のあなたは <br /><span className={`driving-type ${drivingType}`}>{drivingType}</span> タイプでした！</h2>
            {imagePath && <img src={imagePath} alt={drivingType} className="result-image" />}
            <div className="link-container">
                <Link to="/detailed_result/-1" className="btn btn--pink">詳しい結果をみる</Link>
                <Link to="/email_send" className="btn btn--skyblue">結果を共有する</Link>
                <Link to="/" className="btn btn--yellow">メニュー画面に戻る</Link>
            </div>
        </div>
    );
}

export default SimpleResult;
