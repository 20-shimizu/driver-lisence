import React, { useState, useRef } from "react";

const EmailSendForm = () => {
  const [to, setTo] = useState([]); // メールアドレスリスト
  const [subject, setSubject] = useState(""); // 件名
  const [body, setBody] = useState(""); // 本文
  const [attachment, setAttachment] = useState(null); // 添付ファイル
  const [errorMessage, setErrorMessage] = useState(null); // エラーメッセージ
  const [successMessage, setSuccessMessage] = useState(null); // 成功メッセージ

  const emailRef = useRef(); // メールアドレス入力の参照

  // メールアドレスを追加
  const handleAddEmail = (e) => {
    e.preventDefault();
    const newEmail = emailRef.current.value;

    // 入力されていない場合は何もしない
    if (newEmail && !to.includes(newEmail)) {
      setTo((prevTo) => [...prevTo, newEmail]); // 新しいメールアドレスをリストに追加
    }

    emailRef.current.value = "";  // フィールドをリセット
  };

  // 添付ファイルの状態更新
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  // フォーム送信時
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 入力チェック
    if (to.length === 0 || !subject || !body) {
      setErrorMessage("送信先、件名、本文は必須です。");
      return;
    }

    if (attachment) {
      const reader = new FileReader();
      reader.readAsDataURL(attachment);
      reader.onload = async() => {
        const attachmentBase64 = reader.result;
        const payload = {
          to: to,
          subject: subject,
          body: body,
          attachment: attachmentBase64,
        };

        try {
          const response = await fetch("http://localhost:8000/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("メール送信に失敗しました。");
          }

          const data = await response.json();
          setSuccessMessage(data.message);
          setErrorMessage(null);
        } catch (error) {
          setSuccessMessage(null);
          setErrorMessage(error.message);
        }
      };
    } else {
      const payload = {
        to: to,
        subject: subject,
        body: body,
        attachment: null,
      };
      try {
        const response = await fetch("http://localhost:8000/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("メール送信に失敗しました。");
        }

        const data = await response.json();
        setSuccessMessage(data.message);
        setErrorMessage(null);
      } catch (error) {
        setSuccessMessage(null);
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <div>
      <h1>メール送信フォーム</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>送信先 (メールアドレスを追加):</label>
          <input
            type="email"
            ref={emailRef} // refで入力欄を管理
          />
          <button onClick={handleAddEmail}>追加</button>
          <ul>
            {to.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>件名:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            maxLength={100}
          />
        </div>
        <div>
          <label>本文:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label>添付ファイル (オプション):</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.docx,.txt"
          />
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default EmailSendForm;
