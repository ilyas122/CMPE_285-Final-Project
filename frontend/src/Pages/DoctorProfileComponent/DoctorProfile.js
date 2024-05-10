import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './Header';
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;
function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    speciality: "",
    // Add other fields as needed
  });

  // Function to fetch doctor details based on email
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const doctorEmail = localStorage.getItem("email");
        const response = await axios.get(`${DOMAIN}/doctors/${doctorEmail}`);
        setDoctor(response.data);
        setFormData(response.data); // Set initial form data
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${DOMAIN}/doctors/${doctor.email}`, formData);
      setDoctor(response.data); // Update doctor details in state
      setEditing(false);
    } catch (error) {
      console.error("Error updating doctor details:", error);
    }
  };

  return (
    <div style={{ color: "#fff",  minHeight: "100vh", padding: "90px 20px 20px 20px" }}>
      <Header />
      <div style={{ color: "#fff",backgroundColor: "#000", padding: "20px 20px 20px 20px", borderRadius: "10px", border: "2px solid #08D9D6", color: "#393E46" }}>
        {doctor ? (
          <div>
            {editing ? (
              <form onSubmit={handleSubmit} style={{ color: 'black', backgroundColor: 'black', padding: '20px',  maxWidth: '300px' }}>
                <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                </div>
                <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled // Email cannot be edited
                />
                </div>
                <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                />
                </div>
                <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                  placeholder="Speciality"
                />
                </div>
                {/* Add other fields for editing */}
                <button type="submit" style={{ marginTop: '10px' }}>Save</button>
              </form>
            ) : (
              <div className="details-container" style={{ color: "#fff", padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
                <p>Name: {doctor.name}</p>
                <p>Email: {doctor.email}</p>
                <p>Location: {doctor.location}</p>
                <p>Speciality: {doctor.speciality}</p>
                {/* Display other details */}
                <button onClick={() => setEditing(true)}>Edit</button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default DoctorProfile;
