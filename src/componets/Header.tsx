import React from 'react';
import '../style/Header.css'

interface HeaderProps {
  setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  return (
    <nav className="header-nav">
      <button onClick={() => setPage('App')} className="nav-button">所有學生列表</button>
      <button onClick={() => setPage('Insert')} className="nav-button">新增學生</button>
      <button onClick={() => setPage('Delete')} className="nav-button">刪除學生</button>
      <button onClick={() => setPage('Update')} className="nav-button">修改學生</button>
    </nav>
  );
}

export default Header;