import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/new-item">New Item</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default Sidebar;
