// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainSection from './components/MainSection';
import Header from './components/Header';
import Registration from './components/Registration';
import Login from './components/Login';
import Admin from './components/Admin';
import Result from './components/Result';
import UserProfile from './components/UserProfile';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute'; //
const App = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={
                <>
                    <Header />
                    <MainSection />
                </>
            } />
         
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
            {/* Other routes */}
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/result" element={<Result />} />
           
        </Routes>
    </Router>
      
    );
};

export default App;
