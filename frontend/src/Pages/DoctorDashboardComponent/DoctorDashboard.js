import React, { useState, useEffect } from "react";
import "./DoctorDashboard.css";
import axios from "axios"; // Import Axios for making HTTP requests
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from "./Header";

function DoctorDashboard() {
    const [users, setUsers] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null); // State to store the selected doctor's ID
    const demail = localStorage.getItem('email');
    console.log("SS:",demail);
    useEffect(() => {
        // Fetch doctor data from the API
        axios.get(`http://127.0.0.1:5000/doctors/${demail}`)
            .then(response => {
                // Set the fetched doctor data to the state
                setSelectedDoctorId(response.data.id);
                axios.get(`http://127.0.0.1:5000/users/${response.data.id}`)
                .then(userResponse => {
                    // Handle the response, set the users state, etc.
                    const usersData = userResponse.data; // Assuming it's an array
                    setUsers(usersData);
                    console.log("Users:",userResponse.data);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    const handleGoBack = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <>
        <Header />
        <div className="consultclass">
            <Button variant="contained" onClick={handleGoBack} startIcon={<ArrowBackIcon />}style={{ backgroundColor: '#393E46', color: 'white',margin: '10px 0' }}> Back</Button> {/* Use ArrowBackIcon */}
            <h1>Consult Doctor 👨‍⚕️</h1>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Patient Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Location</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.fullname}
                                    </TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.location}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
        </>
    );
}

export default DoctorDashboard;
