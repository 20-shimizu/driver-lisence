import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import Encoding from "encoding-japanese";
import "./SensorDataInput.css";
import { getUserMeUsersMeGet, useCreateSensorDriveSensorsPost, useCreateReportDriveReportsUsersUserIdPost } from "../api/fastAPISample";
import { Link } from "react-router-dom";

function SensorDataInput() {
  const [userId, setUserId] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [formData, setFormData] = useState({});

  const sensorMutation = useCreateSensorDriveSensorsPost();
  const reportMutation = useCreateReportDriveReportsUsersUserIdPost();

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

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0 && !fileName) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const uint8Array = new Uint8Array(target.result);
        const detectedEncoding = Encoding.detect(uint8Array);
        const text = Encoding.convert(uint8Array, {
          to: "UNICODE",
          from: detectedEncoding,
          type: "string",
        });

        const parsed = Papa.parse(text, { skipEmptyLines: true });
        const newData = {};
        parsed.data.forEach(([key, value]) => {
          if (key && value !== undefined) {
            newData[key] = value;
          }
        });
        setFormData(newData);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [fileName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    disabled: fileName !== "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || Object.keys(formData).length === 0) {
      setSuccessMessage('');
      setErrorMessage('CSVデータに誤りがあります');
      return;
    }
    if (loadingMessage) {
      return;
    }

    const formattedData = {
      userId,
      startedAt: new Date(formData["開始時刻"]).toISOString(),
      endedAt: new Date(formData["終了時刻"]).toISOString(),
      milage: parseFloat(formData["走行距離"]),
      averageSpeed: parseFloat(formData["平均速度"]),
      journeyTime: parseFloat(formData["走行時間"]),
      longestContinuousDrive: parseFloat(formData["最長連続走行時間"]),
      idlingTime: parseFloat(formData["アイドリング時間"]),
      maxSpeed: parseFloat(formData["最高速度"]),
      acceralationCount: parseInt(formData["急加速検知回数"], 10),
      brakingCount: parseInt(formData["急ブレーキ検知回数"], 10),
      corneringCount: parseInt(formData["急ハンドル検知回数"], 10),
    };
    
    sensorMutation.mutate(
      { data: formattedData },
      {
        onSuccess: () => {
          setSuccessMessage('');
          setErrorMessage('');
          setLoadingMessage('レポートを生成中...');
          reportMutation.mutate(
            { userId },
            {
              onSuccess: () => {
                setSuccessMessage('レポートを作成しました!');
                setErrorMessage('');
                setLoadingMessage('');
              },
              onError: (error) => {
                setSuccessMessage('');
                setErrorMessage(error.response?.data?.detail || 'レポートの生成に失敗しました');
                setLoadingMessage('');
              }
            }
          )
        },
        onError: (error) => {
          setSuccessMessage('');
          setErrorMessage(error.response?.data?.detail || 'センサデータの登録に失敗しました');
        }
      }
    );
  };

  return (
    <div className="container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        {fileName ? (
          <p className="file-name">{fileName}</p>
        ) : (
          <p className="drop-text">ここにCSVファイルをドラッグ＆ドロップするか、クリックして選択してください。</p>
        )}
      </div>
      {successMessage && <p className="message success">{successMessage}</p>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {loadingMessage && <p className="message loading">{loadingMessage}</p>}
      {fileName && <button className="btn btn--green" onClick={handleSubmit}>登録</button>}
      <Link to="/" className="btn btn--purple">戻る</Link>
    </div>
  );
}

export default SensorDataInput;
