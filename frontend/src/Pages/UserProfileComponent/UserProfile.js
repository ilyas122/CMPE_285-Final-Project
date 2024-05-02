import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './Header';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    location: "",
    password: "",
    doctor_id: "",
    diseases: [],
    // Add other fields as needed
  });

  // Function to fetch user details based on email
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const response = await axios.get(`http://127.0.0.1:5000/users/${userEmail}`);
        setUser(response.data);
        setFormData(response.data); // Set initial form data
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5000/users/${user.email}`, formData);
      setUser(response.data); // Update user details in state
      setEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <>
    <Header/>
    <div style={{ backgroundColor: "#393E46", minHeight: "100vh", padding: "20px" }}>
      <Header />
      <div style={{ backgroundColor: "#08D9D6", padding: "20px", borderRadius: "10px", color: "#393E46" }}>
        {user ? (
          <div>
            {editing ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled // Email cannot be edited
                />
                <input
                  type="text"
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleChange}
                  placeholder="Doctor Id"
                  disabled // DoctorId cannot be edited
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                />
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {/* Display diseases */}
                <h2>Diseases:</h2>
                <ul>
                  {formData.diseases.map((disease, index) => (
                    <li key={index}>{disease}</li>
                  ))}
                </ul>
                {/* Add other fields for editing */}
                <button type="submit">Save</button>
              </form>
            ) : (
              <div>
                <p>Name: {user.fullname}</p>
                <p>Email: {user.email}</p>
                <p>Doctor Id: {user.doctor_id}</p>
                <p>Location: {user.location}</p>
                <p>Password: {user.password}</p>
                {/* Display diseases */}
                <h2>Diseases:</h2>
                <ul>
                  {user.diseases.map((disease, index) => (
                    <li key={index}>{disease}</li>
                  ))}
                </ul>
                <button onClick={() => setEditing(true)}>Edit</button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </>
  );
}

export default UserProfile;
