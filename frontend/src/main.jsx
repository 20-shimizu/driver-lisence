// react-router-domのインポートを追加
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// Switch を入れると表示されなくなる
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top.jsx";
import { SimpleResult } from "./pages/SimpleResult.jsx";
import { DetailedResult } from "./pages/DetailedResult.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";


function App(){
  return (
    <div className="App">
      <BrowserRouter>
          <Link to="/">トップ</Link> | 
          <Link to="/SimpleResult">運転結果</Link>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/SimpleResult" element={<SimpleResult />} />
          <Route path="/DetailedResult" element={<DetailedResult />} />

          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default App;