import { Link } from "react-router-dom";
import { getReportsByUserIdDriveReportsUsersUserIdGet, getUserMeUsersMeGet } from "../api/fastAPISample";
import { useState, useEffect } from "react";
import warning from "../assets/warning-icon.svg";
import "./DrivingHistory.css"; 

function DrivingHistory() {
  const [userId, setUserId] = useState(null);
  const [reports, setReports] = useState([]);
  const drivingTypeName = {
    "1": "急加速・急減速",
    "2": "急ハンドル",
    "3": "速度超過",
    "4": "速度不足",
    "5": "車間距離不足",
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const fetchUserData = async () => {
        try {
          const options = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
        if (userId !== null) {
          const data = await getReportsByUserIdDriveReportsUsersUserIdGet(userId);
          setReports(data.data.reverse());
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (userId !== null) {
      fetchReportData();
    }
  }, [userId]);

  return (
    <div className="history-container">
      <h1 className="history-title">過去の運転履歴</h1>
      <div className="report-list">
        {reports.length === 0 ? (
          <p>運転履歴がありません</p>
        ) : (
          reports.map((report, index) => (
            <div 
                key={index} 
                className={`report-item ${report.evaluationStatus === 2 ? 'report-item--warning' : ''}`}
            >
              <img src={`/src/assets/${report.drivingType}.png`} alt={report.type} className="report-image" />
              <h2>
                {report.evaluationStatus === 2 && 
                    <img 
                    src={warning} 
                    alt="警告" 
                    width={30}
                    height={30}
                    className="warning-icon" />
                }
                {drivingTypeName[report.drivingType]} タイプ
                {report.evaluationStatus === 2 && 
                    <img 
                    src={warning} 
                    alt="警告" 
                    width={30}
                    height={30}
                    className="warning-icon" />
                }
                </h2>
              <Link to={`/detailed_result/${report.id}`} className="btn btn--purple">詳細を見る</Link>
            </div>
          ))
        )}
      </div>
      <Link to="/" className="btn btn--yellow">メニューに戻る</Link>
    </div>
  );
}

export default DrivingHistory;
