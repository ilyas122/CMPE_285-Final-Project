import React, { useState } from "react";
import "./Dashboard.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

    const [symptoms, setSymptoms] = useState('');
    const [prediction, setPrediction] = useState('');
    const [confidence, setConfidence] = useState('');
    const navigate = useNavigate();



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
    </div>
    )
}


export default Dashboard;