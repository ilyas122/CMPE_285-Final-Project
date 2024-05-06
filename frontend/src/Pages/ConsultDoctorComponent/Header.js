import React from "react";
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import "./ConsultDoctor.css";


function Header() {

  const userProfileRoute = () => {
    window.location.href = '/userprofile';
  };

  return (
  
    <header className="header">
    <nav className="navbar navbar-dark fixed-top">
      <div className="container">
        <Link to="/dashboard" className="gradient">
          <img src="/logo.png" alt="Logo" style={{ marginRight: "10px", height: "30px"}} />
          Disease Prediction Systemm
        </Link>
      </div>
      <div className="navbarButtons">
        <button class="btn btn-primary" onClick={userProfileRoute}>
          <span class="profile">
            <span class="profile-text">Profile</span>
            <PersonIcon></PersonIcon>
          </span>
        </button>
      </div>
    </nav>
  </header>
   
  );
}

export default Header;
