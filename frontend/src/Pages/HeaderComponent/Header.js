import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Header.css";
import PersonIcon from '@mui/icons-material/Person';
// import { useLocation } from 'react-router-dom';


function Header({data}) {

    // const location = useLocation();
    const [currentPageName, setCurrentPageName] = useState(null);
  
    useEffect(() => {
      console.log("xxxx::",data);
      const currentPage = localStorage.getItem('currentpage');
      setCurrentPageName(currentPage);
      console.log("yyyy::",currentPage);
    // Cleanup function (optional)
  }, [currentPageName]); // Dependency array


    const consultDoctorRoute = () => {
        window.location.href = '/consultdoctor';
      };
    
      const userProfileRoute = () => {
        window.location.href = '/userprofile';
      };
      const doctorProfileRoute = () => {
        window.location.href = '/doctorprofile';
      };
    
      const dashboardRoute = () => {
        window.location.href = '/dashboard';
      };

      const logoutRoute = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isDoctor');
        window.location.href = '/';
      };

  return (
    <header className="header">
    <nav className="navbar navbar-dark fixed-top">
      <div className="container" style={{maxWidth: '100vw'}}>
        <div className="col-lg-8">
          <Link to="/dashboard" className="gradient">
            <img src="/logo.png" alt="Logo" style={{ marginRight: "10px", height: "30px"}} />
            {/* Disease Prediction System */}
            SymptomDx
          </Link>
        </div>
        
          {/* <div className="navbarButtons">
            {data === 'dashboard' && (
                <button class="btn btn-primary col-lg-2 " onClick={consultDoctorRoute}>Consult Doctor</button>
                <button class="btn btn-primary col-lg-2 " onClick={userProfileRoute}>
                    <span class="profile">
                        <span class="profile-text">Profile</span>
                        <PersonIcon></PersonIcon>
                    </span>
                </button>
            )}
            {data === 'userprofile' && (
                <button class="btn btn-primary col-lg-2 " onClick={dashboardRoute}>Dashboard</button>
            )}
            <button class="btn btn-primary col-lg-2 " onClick={userProfileRoute}>
              <span class="profile">
                <span class="profile-text">Profile</span>
                <PersonIcon></PersonIcon>
              </span>
            </button>
          </div> */}

        
        {data === 'dashboard' && (
            <div className="navbarButtons">
                <button class="btn btn-primary col-lg-2 " onClick={consultDoctorRoute}>Consult Doctor</button>
                <button class="btn btn-primary col-lg-2 " onClick={userProfileRoute}>
                    <span class="profile">
                        <span class="profile-text">Profile</span>
                        <PersonIcon></PersonIcon>
                    </span>
                </button>
                <button class="btn btn-primary col-lg-2 " onClick={logoutRoute}>LogOut</button>
            </div>
        )}
        {currentPageName === 'doctordashboard' && (
            <div className="navbarButtons">
                <button class="btn btn-primary col-lg-2 " onClick={doctorProfileRoute}>
                    <span class="profile">
                        <span class="profile-text">Profile</span>
                        <PersonIcon></PersonIcon>
                    </span>
                </button>
                <button class="btn btn-primary col-lg-2 " onClick={logoutRoute}>LogOut</button>
            </div>
        )}
        {currentPageName === 'userprofile' && (
            <div className="navbarButtons">
                <button class="btn btn-primary col-lg-2 " onClick={dashboardRoute}>Dashboard</button>
                <button class="btn btn-primary col-lg-2 " onClick={consultDoctorRoute}>Consult Doctor</button>
                <button class="btn btn-primary col-lg-2 " onClick={logoutRoute}>Logout</button>
            </div>
        )}
        {data === 'consultdoctor' && (
            <div className="navbarButtons">
                <button class="btn btn-primary col-lg-2 " onClick={dashboardRoute}>Dashboard</button>
                <button class="btn btn-primary col-lg-2 " onClick={userProfileRoute}>
                    <span class="profile">
                        <span class="profile-text">Profile</span>
                        <PersonIcon></PersonIcon>
                    </span>
                </button>
            </div>
        )}






      </div>
    </nav>
  </header>
  );
}

export default Header;
