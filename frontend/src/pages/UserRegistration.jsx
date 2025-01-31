import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import './UserRegistration.css';

export default function UserRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, emailConfirm, birthDate, password });
    alert("登録が完了しました！");
  };

  return (
    <div className="registration-container">
      <Card className="registration-card">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            ようこそ！
          </Typography>
          <form onSubmit={handleSubmit} className="registration-form">
            <TextField
              id="name"
              label="名前"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="email"
              label="メールアドレス"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="emailConfirm"
              label="メールアドレス（確認）"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              required
            />
            <TextField
              id="birthDate"
              label="生年月日"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
            <TextField
              id="password"
              label="パスワード"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              登録
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
