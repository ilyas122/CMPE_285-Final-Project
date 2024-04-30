import React, { useState, useEffect } from "react";
import "./ConsultDoctor.css";
import axios from "axios"; // Import Axios for making HTTP requests
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;
function ConsultDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null); // State to store the selected doctor's ID
    const uemail = localStorage.getItem('email');
    console.log("SS:",uemail);
    useEffect(() => {
        // Fetch doctor data from the API
        axios.get(`${DOMAIN}/doctors`)
            .then(response => {
                // Set the fetched doctor data to the state
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    const handleGoBack = () => {
        window.history.back(); // Go back to the previous page
    };

    const handleActionClick = async (doctor) => {
        try {
            console.log("1doc:",doctor)
            console.log("reached");
            // Get user data from local storage
            const userEmail = localStorage.getItem('email');
            
            // Update user record in the database with the selected doctor's ID
            await axios.put(`${DOMAIN}/users/${userEmail}`, { doctor_id: selectedDoctorId });
            
            await axios.post(`${DOMAIN}/send-mail`, { user_email: userEmail, doctor: doctor });
            
            // Redirect or perform any other action after the update
        } catch (error) {
            console.error('Error updating user record:', error);
        }
    };

    return(
        <div className="consultclass">
            <Button variant="contained" onClick={handleGoBack} startIcon={<ArrowBackIcon />}> Back</Button> {/* Use ArrowBackIcon */}
            <h1>Consult Doctor 👨‍⚕️</h1>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Doctor Name</TableCell>
                                <TableCell align="right">Specialist</TableCell>
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Contact</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doctors.map((doctor, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {doctor.name}
                                    </TableCell>
                                    <TableCell align="right">{doctor.speciality}</TableCell>
                                    <TableCell align="right">{doctor.location}</TableCell>
                                    <TableCell align="right">{doctor.contact}</TableCell>
                                    <TableCell align="right">
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => {setSelectedDoctorId(doctor.id);handleActionClick(doctor);}}
                                        >
                                            Action
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default ConsultDoctor;
