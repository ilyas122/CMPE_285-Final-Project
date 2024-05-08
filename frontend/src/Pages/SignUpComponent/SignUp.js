import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;
function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [fullname, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [error, setError] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);

    useEffect(() => {
      sessionStorage.setItem('keyEntered', 'false');    
    }, []); 

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if (isDoctor) {
                const response = await axios.post(`${DOMAIN}/doctorsignup`, { name, email, password, speciality, location, contact });
                navigate('/');
            } else {
                const response = await axios.post(`${DOMAIN}/signup`, { fullname, email, password, location });
                navigate('/');
            }
        } catch (error) {
            // If login fails, display error message
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <>
        {/* <Header /> */}
        <div className="container LoginOutlier">
    <div className="row">
        <div className="col-lg-6 leftLoginOutlier">
        </div>
        <div className="col-lg-6 RightLoginOutlier">
        {/* <div className="projectTitle">
                <h1>SymptomDx</h1>
              </div> */}
            <div className="loginContainer">
                <div className="loginBox">
                    <form onSubmit={handleSignUp}>
                        <h1>Sign Up</h1>
                        {/* Full Name Input */}
                        {!isDoctor && (
                            <div className="form-group">
                                <label htmlFor="fullname" className="mb-2" style={{ float: 'left' }}>Full Name: </label>
                                <input type="text" id="fullname" className="form-control mb-4 inputclass" value={fullname} onChange={(e) => setFullName(e.target.value)} required />
                            </div>
                        )}
                        {/* Email Input */}
                        <div className="form-group">
                            <label htmlFor="email" className="mb-2" style={{ float: 'left' }}>Email: </label>
                            <input type="email" id="email" className="form-control mb-4 inputclass" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        {/* Password Input */}
                        <div className="form-group">
                            <label htmlFor="password" className="mb-2" style={{ float: 'left' }}>Password: </label>
                            <input type="password" id="password" className="form-control mb-4 inputclass" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {/* Additional fields for doctors */}
                        {isDoctor && (
                            <>
                                {/* Name Input */}
                                <div className="form-group">
                                    <label htmlFor="name" className="mb-2" style={{ float: 'left' }}>Name: </label>
                                    <input type="text" id="name" className="form-control mb-4 inputclass" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                {/* Speciality Input */}
                                <div className="form-group">
                                    <label htmlFor="speciality" className="mb-2" style={{ float: 'left' }}>Speciality: </label>
                                    <input type="text" id="speciality" className="form-control mb-4 inputclass" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required />
                                </div>
                                {/* Location Input */}
                                <div className="form-group">
                                    <label htmlFor="location" className="mb-2" style={{ float: 'left' }}>Location: </label>
                                    <input type="text" id="location" className="form-control mb-4 inputclass" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                </div>
                                {/* Contact Input */}
                                <div className="form-group">
                                    <label htmlFor="contact" className="mb-2" style={{ float: 'left' }}>Contact: </label>
                                    <input type="text" id="contact" className="form-control mb-4 inputclass" value={contact} onChange={(e) => setContact(e.target.value)} required />
                                </div>
                            </>
                        )}
                        {error && <div className="text-red-500">{error}</div>}
                        <div>
                            <input type="checkbox" id="isDoctor" checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} />
                            <label htmlFor="isDoctor" className="ml-2">SignUp as Doctor</label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" style={{ backgroundColor: '#08D9D6', color: '#fff' }}>SignUp</button>
<p>Already have an account? <a href="/" style={{ color: '#08D9D6' }}>Login</a></p>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</>
       
    );

}

export default SignUp;
