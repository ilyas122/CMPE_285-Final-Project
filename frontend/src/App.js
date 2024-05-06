import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginComponent/Login';
import Dashboard from './Pages/DashboardComponent/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConsultDoctor from './Pages/ConsultDoctorComponent/ConsultDoctor';
import DoctorDashboard from './Pages/DoctorDashboardComponent/DoctorDashboard';
import SignUp from './Pages/SignUpComponent/SignUp';
import DoctorCards from './Pages/DoctorCardsComponent/DoctorCards';
import DoctorProfile from './Pages/DoctorProfileComponent/DoctorProfile';
import UserProfile from './Pages/UserProfileComponent/UserProfile';

function App() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleDataFromChild = (newData) => {
    console.log("Page Name:::",newData);
    setCurrentPage(newData);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login/>}></Route>
        <Route path="/signup" element = {<SignUp/>}></Route>
        <Route path="/dashboard" element = {<Dashboard/>} onSendData={handleDataFromChild}></Route>
        {/* <Route path="/consultdoctor" element = {<ConsultDoctor/>}></Route> */}
        <Route path="/doctordashboard" element = {<DoctorDashboard/>}></Route>
        <Route path="/consultdoctor" element = {<DoctorCards/>}></Route>
        <Route path="/doctorprofile" element = {<DoctorProfile/>}></Route>
        <Route path="/userprofile" element = {<UserProfile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
