import React from 'react';
import { Button } from '@mui/material';
import './Top.css'; // 新しいCSSファイルをインポート

const Top = () => {
  return (
    <div className="top-container">
      <h1 className="top-title">トップ画面</h1>
      <div className="button-container">
        <Button variant="contained" fullWidth href="/SimpleResult">本日の結果を見る</Button>
      </div>
      <div className="button-container">
        <Button variant="contained" color="warning" fullWidth href="/DrivingHistory">過去の結果を見る</Button>
      </div>
      <div className="button-container">
        <Button 
          variant="contained" 
          color="success" 
          fullWidth 
          href="https://www.keishicho.metro.tokyo.lg.jp/menkyo/koshin/jisyu_hennou/index.html"
        >
          免許返納について
        </Button>
      </div>
      <div className="button-container">
        <Button variant="contained" color="error" fullWidth>アプリを終了する</Button>
      </div>
    </div>
  );
};

export default Top;
