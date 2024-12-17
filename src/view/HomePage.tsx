import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../style/Home.css';

const HomePage: React.FC = () => {
  return (
    <div className="content-section">
      <h1>歡迎來到學生管理系統</h1>
    </div>
  );
}

export default HomePage;