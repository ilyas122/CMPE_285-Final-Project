// import React from "react";
// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <header className="header">
//       <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#08D9D6" }}>
//         <div className="container">
//           <Link to="/" className="navbar-brand">
//             <img src="/logo.png" alt="Logo" style={{ marginRight: "10px", height: "30px" }} />
//             Disease Prediction System
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;

import React from "react";
import { Link } from 'react-router-dom';

const handleLogout = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('isDoctor');
  window.location.href = '/';
};

function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#08D9D6" }}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="Logo" style={{ marginRight: "10px", height: "30px" }} />
            Disease Prediction System
          </Link>
          {/* Add logout button to the right */}
          <div className="navbar-nav ml-auto">
            <button className="btn btn-outline-light" onClick={handleLogout}>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Logout</Link>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
