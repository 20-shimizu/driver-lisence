// react-router-domのインポートを追加
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// Switch を入れると表示されなくなる
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import Top from "./pages/Top.jsx";
import { Top } from "./pages/TopTest.jsx";
import { SimpleResult } from "./pages/SimpleResult.jsx";
import { DetailedResult } from "./pages/DetailedResult.jsx";
import { DrivingHistory } from "./pages/DrivingHistory.jsx";
import EmailSendForm from "./pages/FamilyProfile.jsx";
import FamilyProfile from './pages/FamilyProfile2.jsx';

import LoginForm from "./pages/Login.jsx";
// import { Logout } from "./pages/Logout.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { UserRegistration } from "./pages/UserRegistration.jsx";
import { Alter } from "./pages/Alter.jsx"


function App(){
  return (
    <div className="App">
      <BrowserRouter>
          <Link to="/">トップ</Link> | 
          <Link to="/SimpleResult">運転結果</Link>|
          <Link to="/UserProfile">プロフィール</Link>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/SimpleResult" element={<SimpleResult />} />
          <Route path="/DetailedResult" element={<DetailedResult />} />
          <Route path="/DrivingHistory" element={<DrivingHistory />} />
          <Route path="/FamilyProfile" element={<FamilyProfile />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="/Alter" element={<Alter />} />

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

