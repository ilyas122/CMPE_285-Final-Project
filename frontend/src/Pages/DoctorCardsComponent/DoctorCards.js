import React, { useState, useEffect } from "react";
import "./DoctorCards.css";
import axios from "axios";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import Header from "./Header";

function DoctorCards() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDoctor, setExpandedDoctor] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/doctors")
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const handleActionClick = async (doctor) => {
    try {
      console.log("1doc:", doctor);
      console.log("reached");
      const userEmail = localStorage.getItem('email');
      await axios.put(`http://127.0.0.1:5000/users/${userEmail}`, { doctor_id: doctor.id });
      await axios.post('http://127.0.0.1:5000/send-mail', { user_email: userEmail, doctor: doctor });
      // Redirect or perform any other action after the update
    } catch (error) {
      console.error('Error updating user record:', error);
    }
  };

  const handleCardClick = (doctor) => {
    if (expandedDoctor === doctor.id) {
      setExpandedDoctor(null);
    } else {
      setExpandedDoctor(doctor.id);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Header/>
    <div className="doctor-cards">
    <div className="search-bar" style={{ border: '2px solid #08D9D6', padding: '5px', borderRadius: '5px', marginBottom: '10px', marginTop: '20px' }}>

        <TextField
          label="Search by speciality"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{
            style: { color: '#08D9D6' } // Change text color of label
          }}
          inputProps={{
            style: { color: '#08D9D6' } // Change text color of input field
          }}
        />
      </div>

      <div className="cards-container">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className={`card ${expandedDoctor === doctor.id ? "expanded" : ""}`} style={{ backgroundColor: '#08D9D6', marginLeft: '50px' }}>

            <CardContent onClick={() => handleCardClick(doctor)}>
              <Typography variant="h5">{doctor.name}</Typography>
              <Typography variant="body1">{doctor.speciality}</Typography>
              {expandedDoctor === doctor.id && (
                <div className="expanded-details">
                  <Typography variant="body2">Doctor Id: {doctor.id}</Typography>
                  <Typography variant="body2">Contact: {doctor.contact}</Typography>
                  <Typography variant="body2">Location: {doctor.location}</Typography>
                  {/* Add more details here */}
                </div>
              )}
            </CardContent>
            <div className="card-action">
              <Button onClick={() => handleActionClick(doctor)}>Action</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
    </>
  );
}

export default DoctorCards;
