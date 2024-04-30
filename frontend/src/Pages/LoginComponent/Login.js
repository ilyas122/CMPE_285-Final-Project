import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
                const response = await axios.post('http://localhost:5000/doctorlogin', { email, password });
                navigate('/doctordashboard');
            } else {
                const response = await axios.post('http://localhost:5000/login', { email, password });
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
        <div>
            <div className="container LoginOutlier">
                <div className="row">
                    <div className="col leftLoginOutlier"></div>
                    <div className="col RightLoginOutlier">
                        <div className="container loginContainer">
                            <div className="loginBox">
                                <form onSubmit={handleLogin}>
                                    <h1>Login</h1>
                                    <div>
                                        <label htmlFor="email" className="mb-2">Email: </label>
                                        <input type="email" id="email" className="border border-gray-300 p-2 rounded mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="mb-2">Password: </label>
                                        <input type="password" id="password" className="border border-gray-300 p-2 rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    {error && <div className="text-red-500">{error}</div>}
                                    <div>
                                        <input type="checkbox" id="isDoctor" checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} />
                                        <label htmlFor="isDoctor" className="ml-2">Login as Doctor</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                                <button className="btn btn-primary" onClick={()=>navigate('/signup')}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
