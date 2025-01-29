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
import Alert from "./pages/Alert.jsx"
import FamilyProfile from './pages/FamilyProfile.jsx';

const queryClient = new QueryClient

function Hub() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login_form" element={<LoginForm />} />
          <Route path="/user_registration" element={<UserRegistration />} />
          <Route path="/simple_result" element={<SimpleResult />} />
          <Route path="/detailed_result" element={<DetailedResult />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/driving_history" element={<DrivingHistory />} />
          {/* <Route path="/email_sendform" element={<EmailSendForm />} /> */}
          <Route path="/family_profile" element={<FamilyProfile />} />
          <Route path="/user_profile" element={<UserProfile />} />

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
