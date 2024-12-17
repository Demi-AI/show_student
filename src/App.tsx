import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GetStudent from './componets/GetStudent';
import DeleteStudent from './componets/DeleteStudent';
import InsertStudent from './componets/InsertStudent';
import UpdateStudent from './componets/UpdateStudent';
import HomePage from './view/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* 导航栏 */}
        <header className="header-nav">
          <Link to="/" className="nav-button">首頁</Link>
          <Link to="/Get" className="nav-button">所有學生列表</Link>
          <Link to="/Insert" className="nav-button">新增學生</Link>
          <Link to="/Delete" className="nav-button">刪除學生</Link>
          <Link to="/Update" className="nav-button">修改學生</Link>
        </header>

        {/* 页面内容 */}
        <div id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Get" element={<GetStudent />} />
            <Route path="/Insert" element={<InsertStudent />} />
            <Route path="/Delete" element={<DeleteStudent />} />
            <Route path="/Update" element={<UpdateStudent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
