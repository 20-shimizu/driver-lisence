import { getUserMeUsersMeGet, getFamiliesByUserIdFamiliesUsersUserIdGet, getReportsByUserIdDriveReportsUsersUserIdGet, useSendMailEmailSendPost } from "../api/fastAPISample";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EmailSend.css"

function EmailSend() {
  const [userId, setUserId] = useState(null);
  const [families, setFamilies] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [summaryComment, setSummaryComment] = useState("");
  const [accelerationComment, setAccelerationComment] = useState("");
  const [brakeComment, setBrakeComment] = useState("");
  const [corneringComment, setCorneringComment] = useState("");
  const emailMutation = useSendMailEmailSendPost();
  
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
      console.error("ログインされていません")
    }
  }, []);

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const data = await getFamiliesByUserIdFamiliesUsersUserIdGet(userId);
        setFamilies(data.data);
      } catch (error) {
        console.log(error);
      }
    }
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
      fetchFamilyData();
      fetchReportData();
    }
  }, [userId]);

  const handleSubmit = (e) => {
    const to = families.map(member => member.email);
    const subject = "運転診断くん 本日の結果"
    const body = `全体のコメント：\n${summaryComment}\n\n加速に関するコメント：\n${accelerationComment}\n\nブレーキに関するコメント：\n${brakeComment}\n\nコーナリングに関するコメント：\n${corneringComment}`;
    setSuccessMessage("");
    setErrorMessage("");
    setLoadingMessage("本日の結果を送信中...")
    emailMutation.mutate(
      {
        data: {
          to: to,
          subject: subject,
          body: body,
        },
      },
      {
        onSuccess: () => {
          setSuccessMessage("本日の結果を送信しました！");
          setErrorMessage("");
          setLoadingMessage("");
        },
        onError: () => {
          setSuccessMessage("");
          setErrorMessage("送信に失敗しました");
          setLoadingMessage("");
        }
      }
    );
  };

  return (
    <div className="email-send-container">
      <h1>結果の共有</h1>
      <p>本日の結果を家族に送信しますか？</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {loadingMessage && <p className="loading">{loadingMessage}</p>}
      <button onClick={handleSubmit} className="btn btn--yellow">送信</button>
      <Link to="/simple_result" className="btn btn--purple">戻る</Link>
    </div>
  );
}

export default EmailSend;
