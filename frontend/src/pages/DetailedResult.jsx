// 詳細結果画面
import{ Link } from "react-router-dom";
import { getReportsByUserIdDriveReportsUsersUserIdGet, getUserMeUsersMeGet } from '../api/fastAPISample';
import { useState, useEffect } from "react";

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
        setBrakeComment(latestData.acceralationComment);
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
    <div>
      <h4>急加速に関するコメント：{accelerationComment}</h4>
      <h4>急ブレーキに関するコメント：{brakeComment}</h4>
      <h4>急ハンドルに関するコメント：{corneringComment}</h4>
      <h4>全体のコメント：{summaryComment}</h4>
      <Link to="/simple_result" className="btn btn--yellow">戻る</Link>

    </div>
  );
};

export default DetailedResult;
  