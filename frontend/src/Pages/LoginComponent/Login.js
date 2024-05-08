import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import Header from "./Header";
import {Input} from "@nextui-org/input";

import { useNavigate } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(null); // Track last mouse X position

  useEffect(() => {
    sessionStorage.setItem("keyEntered", "false");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isDoctor) {
        const response = await axios.post(`${DOMAIN}/doctorlogin`, {
          email,
          password,
        });
        navigate("/doctordashboard");
      } else {
        const response = await axios.post(`${DOMAIN}/login`, {
          email,
          password,
        });
        navigate("/dashboard");
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isDoctor", isDoctor.toString());
      localStorage.setItem("email", email);
    } catch (error) {
      // If login fails, display error message
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleMouseMove = (event) => {
    setLastMouseX(event.clientX); // Update last mouse X on every move
  };  
  
  return (
    <>
      {/* <Header /> */}
      <div className="loginWidth">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 leftLoginOutlier">
            </div>
            {/* <div className="col-6"> */}
            <div className="col-lg-6 noPadding">
              <div className="projectTitle">
                <h1></h1>
              </div>
              <div className="projectTitle">
                <h1>SymptomDx</h1>
              </div>
              <div className="loginBoxContainer">
                <div className="loginBox" onMouseMove={handleMouseMove}>
                  <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="form-group">
                      <label htmlFor="email" className="mb-2" style={{ float: 'left' }}>
                        Email:
                      </label>
                      <input
                        type="email"
                        label="Email"
                        id="email"

                        // className="form-control mb-4"
                        className={`form-control inputclass mb-4 ${lastMouseX!== null? lastMouseX < window.innerWidth / 2? "border-right-green" : "border-left-green" : ""}`}

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="mb-2" style={{ float: 'left' }}>
                        Password:
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control mb-4 inputclass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="form-group mb-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="isDoctor"
                          checked={isDoctor}
                          onChange={() => setIsDoctor(!isDoctor)}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="isDoctor"
                          className="form-check-label ml-2"
                        >
                          Login as Doctor
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">
                      Login
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>

              {/* <div className="container loginContainer">

                        <div className="projectTitle"><h1>ewfhb</h1></div>
                        <div className="projectTitle"><h1>ewfhb</h1></div>


                        <div className="row">
                            <div className="col">
                                <div className="projectTitle">
                                    <p style={{color: 'white'}}>Decc</p>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col">
                                        <div className="loginBox">
                                        <form onSubmit={handleLogin}>
                                            <h1>Login</h1>
                                            <div className="form-group">
                                                <label htmlFor="email" className="mb-2">Email:</label>
                                                <input type="email" id="email" className="form-control mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password" className="mb-2">Password:</label>
                                                <input type="password" id="password" className="form-control mb-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            </div>
                                            {error && <div className="text-red-500">{error}</div>}
                                            <div className="form-group mb-3">
                                                <div className="form-check">
                                                    <input type="checkbox" id="isDoctor" checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} className="form-check-input" />
                                                    <label htmlFor="isDoctor" className="form-check-label ml-2">Login as Doctor</label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary mr-2" style={{ backgroundColor: '#08D9D6', color: '#fff' }}>Login</button>
                                    <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ backgroundColor: '#08D9D6', color: '#fff', marginLeft: '10px' }}>Sign Up</button>

                                        </form>
                                    </div>
                            </div>

                        </div>
                      

     
                    </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
