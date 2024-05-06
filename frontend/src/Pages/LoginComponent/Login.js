import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import Header from "./Header";

import { useNavigate } from 'react-router-dom';
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);

    useEffect(() => {
      sessionStorage.setItem('keyEntered', 'false');    
    }, []); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (isDoctor) {
                const response = await axios.post(`${DOMAIN}/doctorlogin`, { email, password });
                navigate('/doctordashboard');
            } else {
                const response = await axios.post(`${DOMAIN}/login`, { email, password });
                navigate('/dashboard');
            }
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isDoctor', isDoctor.toString());
            localStorage.setItem('email', email);
        } catch (error) {
            // If login fails, display error message
            setError('Invalid email or password. Please try again.');
        }
    };
   
    return (
        <>
        {/* <Header /> */}
        <div className="loginWidth">
        <div className="container">
            <div className="row">
                {/* <div className="col-6 leftLoginOutlier">
                    <div className="content">
                        <img src="./image.png" alt="Doctor" />
                        <h2>Be your own Doctor</h2>
                    </div>
                </div> */}
                {/* <div className="col-6"> */}
                <div className="noPadding">
                    <div className="projectTitle"><h1></h1></div>
                    <div className="projectTitle"><h1>Disease Prediction System</h1></div>
                    <div className="loginBoxContainer">
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
