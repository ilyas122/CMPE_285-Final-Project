import React, { useState, useRef, useEffect } from "react";
import "./Dashboard.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';



function Dashboard() {

    const [symptoms, setSymptoms] = useState('');
    const [prediction, setPrediction] = useState('');
    const [confidence, setConfidence] = useState('');
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);
    const [messages, setMessages] = useState([]);



    useEffect(() => {
        if (isExpanded && contentRef.current) {
            const height = contentRef.current.scrollHeight;
            contentRef.current.style.height = `${height}px`;
          } else if (contentRef.current) {
            contentRef.current.style.height = '0';
          }
       }, [isExpanded]);


    const toggleChatbot = () => {
        setIsExpanded(!isExpanded);
        console.log(isExpanded);
     };
    const sendMessage = (message) => {
        setMessages([...messages, message]);
     };

    const handleConsultDoctor = () =>{
        navigate('/consultdoctor');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Type of symptoms:', typeof symptoms);
        try {
            const symptomsArray = symptoms.split(',').map(symptom => parseInt(symptom.trim()));
            const response = await axios.post('http://localhost:5000/predict', { symptoms: symptomsArray });
            const data = response.data;
            console.log('Response:', data);

            // Update state with prediction and confidence values
            setPrediction(data.prediction);
            setConfidence(data.confidence);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                Enter Symptoms (separated by commas):
                <input
                    type="text"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                />
            </label>
            <button type="submit">Predict</button>
        </form>
        {prediction && confidence && (
            <div>
                <h2>Prediction: {prediction}</h2>
                <p>Confidence: {confidence}</p>

                <button type="button" onClick={handleConsultDoctor} className="btn btn-primary">Consult Doctot 👨‍⚕️</button>
            </div>
            
        )}


        <div className={`chatbot-container ${isExpanded ? 'expanded' : ''}`} >
            <div ref={contentRef}>
                <span className="healthgptTitle">Health GPT 🩺 <span onClick={toggleChatbot} ><ArrowUpwardSharpIcon/></span></span>
                {isExpanded && (
                    <div>
                    <h1>Matter</h1>
                    <div className="chat-interface">
                      {messages.map((message, index) => (
                        <p key={index}>{message}</p>
                      ))}
                      <input type="text" placeholder="Type a message..." onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                         sendMessage(e.target.value);
                         e.target.value = '';
                        }
                      }} />
                    </div>
                  </div>


                )}
            </div>
        </div>


    </div>
    )
}


export default Dashboard;