import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Get from './Get';
import { Insert } from './Insert';
import { Update } from './Update';
import "../style/App.css";

const App: React.FC = () => {
  return (
    <Router>
        {/* 頁面内容 */}
        <div id="main">
          <Routes>
          <Route path="/" element={<Get />} />
            <Route path="/Get" element={<Get />} />
            <Route path="/Insert" element={<Insert />} />
            <Route path="/Update:id" element={<Update />} />
          </Routes>
        </div>
    </Router>
  );
};

export default App;