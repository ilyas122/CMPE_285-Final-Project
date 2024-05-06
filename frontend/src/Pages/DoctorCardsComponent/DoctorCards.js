import React, { useState, useEffect } from "react";
import "./DoctorCards.css";
import axios from "axios";
import { Card, CardContent, Typography, Button, TextField, Snackbar, Alert } from "@mui/material";
import Header from "../HeaderComponent/Header.js";
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;
function DoctorCards() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess,setIsSuccess]=useState(true);
  const [pageName, setPageName] = useState(null);

  useEffect(() => {
    const pageName = window.location.pathname.split('/').pop();
    localStorage.setItem('currentPage', pageName);


    axios.get(`${DOMAIN}/doctors`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  useEffect(() => {
    const page = window.location.pathname.split('/').pop();
    localStorage.setItem('currentPage', page);
    setPageName(page);
  }, []);

  const handleActionClick = async (doctor) => {
    try {
      const userEmail = localStorage.getItem('email');
      await axios.put(`${DOMAIN}/users/${userEmail}`, { doctor_id: doctor.id });
      await axios.post(`${DOMAIN}/send-mail`, { user_email: userEmail, doctor: doctor });
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating user record:', error);
      setIsSuccess(false);
      setSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
    <Header data={pageName}/>
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
                </div>
              )}
            </CardContent>
            <div className="card-action">
              <Button onClick={() => handleActionClick(doctor)}>Consult</Button>
            </div>
          </Card>
        ))}
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleClose}
          severity={isSuccess?"success":"error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isSuccess? "Doctor consultation succesful!!":"Doctor consultation Failed!!"}
        </Alert>
      </Snackbar>
    </div>
    </>
  );
}

export default DoctorCards;
