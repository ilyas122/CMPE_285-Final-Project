import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginComponent/Login';
import Dashboard from './Pages/DashboardComponent/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConsultDoctor from './Pages/ConsultDoctorComponent/ConsultDoctor';
import DoctorDashboard from './Pages/DoctorDashboardComponent/DoctorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login/>}></Route>
        <Route path="/dashboard" element = {<Dashboard/>}></Route>
        <Route path="/consultdoctor" element = {<ConsultDoctor/>}></Route>
        <Route path="/doctordashboard" element = {<DoctorDashboard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
