import React from "react";
import "./ConsultDoctor.css"
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
// import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';





function ConsultDoctor(){

    const handleGoBack = () => {
        window.history.back(); // Go back to the previous page
    };

    function createData(name, age, specialist, location, contact) {
        return { name, age, specialist, location,contact };
    }
    const rows = [
        createData('Dr.Prabhas', 10, 'child', 'San Jose' ),
        createData('Dr.Allu Arjun', 20, 'Heart', 'New York' ),
    ];



    return(
        <div className="consultclass">
                  <Button variant="contained" onClick={handleGoBack} startIcon={<ArrowBackIcon />}> Back</Button> {/* Use ArrowBackIcon */}

            <h1>Consult Doctor 👨‍⚕️</h1>

            <div>
                {/* <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}





                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Doctor Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Specialist</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Contact</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                            key={index} // Use index as key since the data doesn't have unique identifiers
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                            <TableCell align="right">{row.specialist}</TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                            <TableCell align="right"><Button variant="contained" color="primary">Action</Button></TableCell>
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
