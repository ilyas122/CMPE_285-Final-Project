import React, { useState, useEffect } from "react";
import axios from "axios";
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
    <div>
      {doctor ? (
        <div>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
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
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <input
                type="text"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                placeholder="Speciality"
              />
              {/* Add other fields for editing */}
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
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
  );
}

export default DoctorProfile;
