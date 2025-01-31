// 詳細結果画面
import{ Link } from "react-router-dom";
import { getReportsByUserIdDriveReportsUsersUserIdGet, getUserMeUsersMeGet } from '../api/fastAPISample';
import { useState, useEffect } from "react";
import "./DetailedResult.css"

function DetailedResult() {
  const [userId, setUserId] = useState(null);
  const [summaryComment, setSummaryComment] = useState("");
  const [accelerationComment, setAccelerationComment] = useState("");
  const [brakeComment, setBrakeComment] = useState("");
  const [corneringComment, setCorneringComment] = useState("");

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
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const data = await getReportsByUserIdDriveReportsUsersUserIdGet(userId);
        const latestData = data.data.at(-1);
        setAccelerationComment(latestData.acceralationComment);
        setBrakeComment(latestData.brakingComment);
        setCorneringComment(latestData.corneringComment);
        setSummaryComment(latestData.overallSummary);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId !== null) {
      fetchReportData();
    }
  }, [userId]);


  return (
    <div className="detailed-result">
      <div className="result-container">
        <h2 className="title">本日の結果</h2>

        <div className="comment-container">
          <div className="comment-section">
            <h4 className="comment-title">急加速に関するコメント</h4>
            <p className="comment-text">{accelerationComment}</p>
          </div>

          <div className="comment-section">
            <h4 className="comment-title">急ブレーキに関するコメント</h4>
            <p className="comment-text">{brakeComment}</p>
          </div>

          <div className="comment-section">
            <h4 className="comment-title">急ハンドルに関するコメント</h4>
            <p className="comment-text">{corneringComment}</p>
          </div>

          <div className="summary-section">
            <h4 className="summary-title">全体のコメント</h4>
            <p className="summary-text">{summaryComment}</p>
          </div>
        </div>
      </div>

      <div className="button-container">
        <Link to="/simple_result" className="btn btn--yellow">戻る</Link>
      </div>
    </div>
  );
};

export default DetailedResult;
  