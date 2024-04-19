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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogRef = useRef(null);
    const [apiKey, setApiKey] = useState('');
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [chatHistory, setChatHistory] = useState([]);





    useEffect(() => {
        if (isExpanded && contentRef.current) {
            const height = contentRef.current.scrollHeight;
            contentRef.current.style.height = `${height}px`;
          } else if (contentRef.current) {
            contentRef.current.style.height = '0';
          }
       }, [isExpanded]);

       useEffect(() => {
        if (isDialogOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isDialogOpen]);

        useEffect(() => {
            setChatHistory([]);
        },[]);


    const toggleChatbot = () => {
        setIsExpanded(!isExpanded);
        console.log(isExpanded);
     };
    const sendMessage = (message) => {
        setMessages([...messages, message]);
     };


     const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleApiKeySubmit = () => {
        // Validate or use the API key here
        console.log('API Key:', apiKey);
        closeDialog();
        toggleChatbot();
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

    const chatbotrequest = async () => {
        try {
          // const res = await axios.post('http://ec2-3-94-212-26.compute-1.amazonaws.com:8000/chat', {
            const res = await axios.post('http://localhost:5000/chat', {
            openai_api_key: apiKey,
            user_input: userInput,
          });
          setResponse(res.data.response);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          // Fetch chat history after sending a message
          getChatHistory();
          setUserInput('');
        }
      };

      const getChatHistory = async () => {
        try {
          // const res = await axios.get('http://ec2-3-94-212-26.compute-1.amazonaws.com:8000/get_chat_history');
          const res = await axios.get('http://localhost:5000/get_chat_history');
          setChatHistory(res.data);
        } catch (error) {
          console.error('Error fetching chat history:', error);
          alert(`Error: ${error.message}`);
        }
      };

      const validInput = () =>{
        // if(inputType!=="" && databaseUri!=="" && openaiApiKey!==""){
          if(apiKey!==""){
    
            chatbotrequest();
        }
        else{
          alert("Enter valid details");
        }
    
      }


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
                <span className="healthgptTitle">Health GPT 🩺 <span onClick={openDialog} ><ArrowUpwardSharpIcon/></span></span>
                {isExpanded && (
                    <div>
                    <h1>Matter</h1>
                    <div className="chat-interface">
                      {messages.map((message, index) => (
                        <p key={index}>{message}</p>
                      ))}
                      <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Type a message..." onKeyPress={(e) => {
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

        <dialog ref={dialogRef} onDismiss={closeDialog}>
            <h2>Enter Open API Key</h2>
            <input type="text" placeholder="Enter Open API Key" onChange={e => setApiKey(e.target.value)}/>
            <button onClick={handleApiKeySubmit}>Submit</button>
            <button onClick={closeDialog}>Cancel</button>
        </dialog>

    </div>
    )
}


export default Dashboard;