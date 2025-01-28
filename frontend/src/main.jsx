import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Top from './pages/Top.jsx';
import SimpleResult from "./pages/SimpleResult.jsx";
import DetailedResult from "./pages/DetailedResult.jsx";
import DrivingHistory from "./pages/DrivingHistory.jsx";
// import EmailSendForm from "./pages/FamilyProfile.jsx";
import LoginForm from "./pages/Login.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserRegistration from "./pages/UserRegistration.jsx";
import Alter from "./pages/Alter.jsx"
import FamilyProfile from './pages/FamilyProfile.jsx';

const queryClient = new QueryClient

function Hub() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="/SimpleResult" element={<SimpleResult />} />
          <Route path="/DetailedResult" element={<DetailedResult />} />
          <Route path="/Alter" element={<Alter />} />
          <Route path="/DrivingHistory" element={<DrivingHistory />} />
          {/* <Route path="/EmailSendForm" element={<EmailSendForm />} /> */}
          <Route path="/FamilyProfile" element={<FamilyProfile />} />
          <Route path="/UserProfile" element={<UserProfile />} />

          <Route path="*" element={<h1>Not Found Page</h1>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Hub />
    </QueryClientProvider>
  </StrictMode>,
);
