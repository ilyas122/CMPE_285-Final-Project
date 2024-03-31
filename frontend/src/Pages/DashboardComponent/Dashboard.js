import React, { useState } from "react";
import "./Dashboard.css";
import axios from 'axios';


function Dashboard() {

    const [symptoms, setSymptoms] = useState('');
    const [prediction, setPrediction] = useState('');
    const [confidence, setConfidence] = useState('');

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
        // <div>
        //     <h1>Dashboard</h1>
            
        // </div>





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
        {/* Display prediction and confidence if available */}
        {prediction && confidence && (
            <div>
                <h2>Prediction: {prediction}</h2>
                <p>Confidence: {confidence}</p>
            </div>
        )}
    </div>
    )
}


export default Dashboard;