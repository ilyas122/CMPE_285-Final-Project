import React, { useState, useEffect } from "react";
import "./ConsultDoctor.css";
import axios from "axios";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from "./Header";
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;

function ConsultDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const uemail = localStorage.getItem('email');

    useEffect(() => {
        axios.get(`${DOMAIN}/doctors`)
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
            });
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    const handleActionClick = async (doctor) => {
        try {
            const userEmail = localStorage.getItem('email');
            await axios.put(`${DOMAIN}/users/${userEmail}`, { doctor_id: selectedDoctorId });
            await axios.post(`${DOMAIN}/send-mail`, { user_email: userEmail, doctor: doctor });
        } catch (error) {
            console.error('Error updating user record:', error);
        }
    };

    return(
        <>
        <Header/>
        <div>
            <div className="consultclass">
                <Button variant="contained" onClick={handleGoBack} startIcon={<ArrowBackIcon />}> Back</Button>
                <h2>Consult Doctor 👨‍⚕️</h2>
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
                                                onClick={() => {
                                                    setSelectedDoctorId(doctor.id);
                                                    handleActionClick(doctor);
                                                }}
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
        </div>
        </>
    );
}

export default ConsultDoctor;
