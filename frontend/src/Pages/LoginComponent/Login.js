import React, { useEffect } from "react";
import "./Login.css";
// import {} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
      sessionStorage.setItem('keyEntered', 'false');    
    }, []); 


    const handleDashboardRoute = () =>{
        navigate('/dashboard');
    }

  return (
    <div>
      <div className="container LoginOutlier">
        <div className="row">
            <div className="col leftLoginOutlier">
            </div>
            <div className="col RightLoginOutlier">
                <div className="container loginContainer">
                <div className="loginBox">
                    <form>
                    <h1>Login</h1>
                        <div>
                        <label htmlFor="username" className="mb-2">Username: </label>
                        <input type="text" id="username" className="border border-gray-300 p-2 rounded mb-4" />
                        </div>
                        <div>
                        <label htmlFor="password" className="mb-2">Password: </label>
                        <input type="text" id="password" className="border border-gray-300 p-2 rounded mb-4" />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleDashboardRoute}>Login</button>
                    </form>

                </div>

                </div>

            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
