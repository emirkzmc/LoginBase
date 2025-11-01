import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import ProtectedRoute from './components/Route/ProtectedRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/forget' element={<ForgotPasswordPage/>}/>
  
      <Route
        path="/" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;