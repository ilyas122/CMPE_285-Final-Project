import React from "react";
import { Link } from 'react-router-dom';
import "./Dashboard.css";
import PersonIcon from '@mui/icons-material/Person';



function Header() {

  const consultDoctorRoute = () => {
    window.location.href = '/consultdoctor';
  };

  const userProfileRoute = () => {
    window.location.href = '/userprofile';
  };

  return (
    <header className="header">
      <nav className="navbar navbar-dark fixed-top">
        <div className="container" style={{maxWidth: '100vw'}}>
          <div className="col-lg-8">
            <Link to="/dashboard" className="gradient">
              <img src="/logo.png" alt="Logo" style={{ marginRight: "10px", height: "30px"}} />
              Disease Prediction System
            </Link>
          </div>
          
            <div className="navbarButtons">
              <button class="btn btn-primary col-lg-2 " onClick={consultDoctorRoute}>Consult Doctor</button>
              <button class="btn btn-primary col-lg-2 " onClick={userProfileRoute}>
                <span class="profile">
                  <span class="profile-text">Profile</span>
                  <PersonIcon></PersonIcon>
                </span>
              </button>
            </div>


        </div>
      </nav>
    </header>
  );
}

export default Header;
