import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
                const response = await axios.post('http://127.0.0.1:5000/doctorsignup', { name, email, password, speciality, location, contact });
                navigate('/');
            } else {
                const response = await axios.post('http://127.0.0.1:5000/signup', { fullname, email, password, location });
                navigate('/');
            }
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
                                <form onSubmit={handleSignUp}>
                                    <h1>Sign Up</h1>
                                    {isDoctor && <div>
                                        <label htmlFor="name" className="mb-2">Name: </label>
                                        <input type="text" id="name" className="border border-gray-300 p-2 rounded mb-4" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>}
                                    {!isDoctor && <div>
                                        <label htmlFor="fullname" className="mb-2">Full Name: </label>
                                        <input type="text" id="fullname" className="border border-gray-300 p-2 rounded mb-4" value={fullname} onChange={(e) => setFullName(e.target.value)} required />
                                    </div>}
                                    <div>
                                        <label htmlFor="email" className="mb-2">Email: </label>
                                        <input type="email" id="email" className="border border-gray-300 p-2 rounded mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="mb-2">Password: </label>
                                        <input type="password" id="password" className="border border-gray-300 p-2 rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    {isDoctor && <>
                                    <div>
                                        <label htmlFor="speciality" className="mb-2">Speciality: </label>
                                        <input type="text" id="speciality" className="border border-gray-300 p-2 rounded mb-4" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label htmlFor="location" className="mb-2">Location: </label>
                                        <input type="text" id="location" className="border border-gray-300 p-2 rounded mb-4" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                    </div>
                                    <div>
                                        <label htmlFor="contact" className="mb-2">Contact: </label>
                                        <input type="text" id="contact" className="border border-gray-300 p-2 rounded mb-4" value={contact} onChange={(e) => setContact(e.target.value)} required />
                                    </div>
                                    </>}
                                    {error && <div className="text-red-500">{error}</div>}
                                    <div>
                                        <input type="checkbox" id="isDoctor" checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} />
                                        <label htmlFor="isDoctor" className="ml-2">SignUp as Doctor</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">SignUp</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
