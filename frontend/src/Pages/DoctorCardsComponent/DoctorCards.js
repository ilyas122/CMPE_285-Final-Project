import React, { useState, useEffect } from "react";
import "./DoctorCards.css";
import axios from "axios";
//import { Card, CardContent, Typography, Button, TextField, Snackbar, Alert } from "@mui/material";
import {TextField, Snackbar, Alert } from "@mui/material";
import Header from "../HeaderComponent/Header.js";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/button";
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;
function DoctorCards() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess,setIsSuccess]=useState(true);
  const [pageName, setPageName] = useState(null);


  ///

  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  //

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
    <div className="search-bar">

        <TextField
          label="Search by speciality"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            border: '2px solid #08D9D6', 
            padding: '5px', 
            borderRadius: '5px', 
            marginBottom: '10px', 
            marginTop: '20px',
            width: '100%'
          }}
          InputLabelProps={{
            style: { color: '#08D9D6' } // Change text color of label
          }}
          inputProps={{
            style: { color: '#08D9D6',  } // Change text color of input field
          }}
        />
      </div>

      <div className="cards-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin:'40px' }}>
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="max-w-[30%] mb-4" style={{ backgroundColor: '#000', border: '2px solid #08d9d6', borderRadius: '10px', color: '#fff', minWidth: '300px' }}>
            <CardHeader className="flex gap-3">
              {/* <Image
                alt="doctor image"
                height={40}
                radius="sm"
                src={doctor.image}
                width={40}
              /> */}
              <div className="flex flex-col">
                <p className="text-md" style={{ fontWeight: 'bold', fontSize: '1.5rem', lineHeight: '1.8' }}>{doctor.name}</p>
                <p className="text-small text-default-500">{doctor.speciality}</p>
              </div>
            </CardHeader>
            <Divider />
            {/* <CardBody>
              <p>Doctor Id: {doctor.id}</p>
              <p>Contact: {doctor.contact}</p>
              <p>Location: {doctor.location}</p>
            </CardBody>
            <Divider /> */}
            <CardFooter style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                color="#08d9d6"
                style={{ borderRadius: '20px' }}
                onClick={() => handleActionClick(doctor)}
              >
                Consult
              </Button>
            </CardFooter>
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
