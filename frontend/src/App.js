import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginComponent/Login';
import Dashboard from './Pages/DashboardComponent/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConsultDoctor from './Pages/ConsultDoctorComponent/ConsultDoctor';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>


    <Router>
      <Routes>
        <Route path="/" element = {<Login/>}></Route>
        <Route path="/dashboard" element = {<Dashboard/>}></Route>
        <Route path="/consultdoctor" element = {<ConsultDoctor/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
