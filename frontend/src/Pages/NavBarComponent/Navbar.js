import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
    const isDoctor = localStorage.getItem("isDoctor");
    console.log("ISD:",isDoctor)
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to={isDoctor?"/doctordashboard":"/dashboard"} className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/consultdoctor" className="nav-link">Consult Doctor</Link>
          </li>
        </ul>
        <div className="profile">
          {isDoctor?<Link to="/userprofile" className="profile-link">User Profile</Link>:<Link to="/doctorprofile" className="profile-link">Doctor Profile</Link>}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
