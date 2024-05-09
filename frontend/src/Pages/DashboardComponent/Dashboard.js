import React, { useState, useRef, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import Select from 'react-select';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
// import Header from "./Header";
import Header from "../HeaderComponent/Header.js";
import Typewriter from 'typewriter-effect';
const DOMAIN = process.env.REACT_APP_DOMAIN_URL;


function Dashboard(props) {
  console.log("Props:", props); // Check if props.onSendData exists

  const [selected, setSelected] = useState([]);
  const [options,setOptions]=useState([]);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);
  const [apiKey, setApiKey] = useState("");
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const scrollToBottomRef = useRef(null); 
  const [pageName, setPageName] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios.get(`${DOMAIN}/symptoms`)
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetchingsymptoms:', error);
      });
  }, []);

  useEffect(() => {
    const page = window.location.pathname.split('/').pop();
    localStorage.setItem('currentPage', page);
    setPageName(page);
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= confidence ? confidence : prevProgress + 1
      );
    }, 20);
    return () => {
      clearInterval(timer);
    };
  }, [confidence]);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const height = contentRef.current.scrollHeight;
      contentRef.current.style.height = `${height}px`;
    } else if (contentRef.current) {
      contentRef.current.style.height = "0";
    }
  
    // Handle dialog visibility based on isDialogOpen
    if (isDialogOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
    getChatHistory(); // Assuming getChatHistory is a function to fetch data
  
  }, [isExpanded, isDialogOpen]); // Dependency array includes both state variables

  useEffect(() => {
    // Clear chat history on initial mount
    setChatHistory([]);  
    // Dependency for content height and dialog visibility
  }, []);

  useEffect(() => {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
 }, [chatHistory]);
  

  const toggleChatbot = () => {
    console.log("TOGGLE");
    setIsExpanded(!isExpanded);
    console.log(isExpanded);
  };
  const sendMessage = (message) => {
    setMessages([...messages, message]);
  };

  const openDialog = () => {
    if('true' === sessionStorage.getItem('keyEntered')){
      toggleChatbot();
    }
    else{
      console.log("OPEND DIALOG");
      setIsDialogOpen(true);
    }

  };

  const closeDialog = () => {
    console.log("closeeee");
    setIsDialogOpen(false);
  };


  const handleApiKeySubmit = async () => {
        if (!isValidApiKey(apiKey)) {
            alert("Invalid API Key format. Please enter a valid API Key that starts with 'sk-' followed by 32 alphanumeric characters.");
            return; 
        }

        try {
            const response = await axios.get('https://api.openai.com/v1/engines', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            console.log("API Key Validation Response:", response);
            console.log("API Key:", apiKey);
            sessionStorage.setItem('keyEntered', 'true');
            closeDialog();
            toggleChatbot();
            


        } catch (error) {
            if (error.response) {
                const status = error.response.status;

                if (status === 401) {
                    alert("Invalid API Key. Please check your key and try again.");
                } else {
                    alert("An error occurred while validating your API Key. Please try again later.");
                }
            } else {
                console.error("Network error or unexpected error:", error);
                alert("A network error occurred while validating your API Key. Please check your connection and try again.");
            }
        }
    
};

const isValidApiKey = (apiKey) => {
  // Check if the API key starts with 'sk-' and is followed by 32 alphanumeric characters
  // return /^sk-[a-zA-Z0-9]{32}$/.test(apiKey);
  return true;
};

  const handlePredict = async (e) => {
    e.preventDefault();
    const symptomsArray = selected.map(symptom => parseInt(symptom.id));
    try {
        //const symptomsArray = symptoms.split(',').map(symptom => parseInt(symptom.trim()));
        const response = await axios.post(`${DOMAIN}/predict`, { symptoms: symptomsArray });
        const data = response.data;
        console.log('Response:', data);
        setPrediction(data.prediction);
        setConfidence(data.confidence);
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleDisease = async (e) => {
  e.preventDefault();
  try {
      const userEmail = localStorage.getItem("email");
      const disease = { disease: prediction };
      //const symptomsArray = symptoms.split(',').map(symptom => parseInt(symptom.trim()));
      const response = await axios.post(`${DOMAIN}/user/add_disease/${userEmail}`,disease);
      //const data = response.data;
      console.log('Response:', response.data);
  } catch (error) {
      console.error('Error:', error);
  }
};

  const chatbotrequest = async () => {
    try {
      console.log("KEY:::", apiKey);
      console.log("INPUTTT:::", userInput);
      const res = await axios.post(`${DOMAIN}/ask`, {
        openai_api_key: apiKey,
        user_input: userInput,
      });
      console.log("KEY:::", apiKey);
      console.log("INPUTTT:::", userInput);
      console.log(res.data);
      setResponse(res.data.response);
      setMessages([...messages, userInput, res.data.response]);
      console.log("Full chat ::,", messages);
      scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      getChatHistory();
      setUserInput("");
    }
  };

  const getChatHistory = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/get_chat_history`);
      setChatHistory(res.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const getTypewriterStrings = () => {
    return [
      "Feeling off 🙁? Let's explore what's going on.",
      "Symptom curious? We can help you understand 🤝.",
      "Health concern 🤒? We're here to guide you."
    ];
  };

  const handleSelectionChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setPrediction('');
    setConfidence(0);
};

const handlePage = () => {
    window.location.href = '/consultdoctor';
};


  return (
    <div className="globalFont">
      <Header data={pageName} />      
      <div className='dashboard' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'black' }}>
            <div className='typewriter'>
              <Typewriter options={{ strings: getTypewriterStrings(), autoStart: true, loop: true, delay: 40 }} />
            </div>
            {/* <Typography variant="h3" gutterBottom style={{ marginBottom: '40px', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>Select your symptoms:</Typography> */}
            <Select
                options={options}
                isMulti
                value={selected}
                placeholder="Select your symptoms:"
                background-color="white"
                color="black"
                onChange={handleSelectionChange}
                getOptionLabel={(option) => option.name} // Display the disease name in the dropdown
                getOptionValue={(option) => option.id}
                name="symptoms"
                className="basic-multi-select"
                classNamePrefix="select"
                menuMaxHeight={100}
                styles={{
                    container: (provided) => ({
                        ...provided,
                        width: '800px',
                        marginBottom: '30px'
                    }),
                    menu: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                        maxHeight: '150px',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '4px'
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? '#d3d3d3' : '#fff',
                        '&:hover': {
                            backgroundColor: '#d3d3d3'
                        }
                    })
                }}
            />
          <Button
            variant='contained'
            size='large'
            onClick={handlePredict}
            // disabled={selected.length === 0}
            style={{
              fontSize: '1.5rem',
              marginBottom: '30px',
              backgroundColor: '#08D9D6', // Changed color
              color: '#fff', // Text color
              padding: '15px 30px',
              borderRadius: '10px',
              boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)',
              zIndex: 1
            }}
          >
            Predict
          </Button>          
          {/* {prediction && <Button
            variant='contained'
            size='large'
            onClick={handleDisease}
            style={{
              fontSize: '1.5rem',
              marginBottom: '30px',
              backgroundColor: '#08D9D6', // Changed color
              color: '#fff', // Text color
              padding: '15px 30px',
              borderRadius: '10px',
              boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)',
              zIndex: 1
            }}
          >
            Add Disease
          </Button>} */}

            {prediction && confidence && (
                <Box sx={{ width: '800px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)' }}>
                    <Typography variant="h5" gutterBottom style={{ marginBottom: '10px', borderRadius: '5px' }}>{`Predicted Disease: ${prediction} `}</Typography>
                    <Typography variant="h5" gutterBottom style={{ marginBottom: '10px' }}>Confidence Score: {confidence}%</Typography>
                    {/* <LinearProgress variant="determinate" value={confidence} style={{ marginBottom: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px' }} /> */}

                    {/* <LinearProgress
                        variant="determinate"
                        value={confidence}
                        style={{
                          marginBottom: '10px',
                          backgroundColor: '#e0e0e0',
                          height:'15px',
                          borderRadius: '5px',
                          // Set color based on confidence value
                          color: confidence < 40 ? 'green' : confidence >= 40 && confidence <= 70 ? 'yellow' : 'red',
                        }}
                      /> */}



<LinearProgress
      variant="determinate"
      value={progress}
      style={{
        marginBottom: '10px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        height: '15px',
        animation: 'progressAnimation 2s linear',
      }}
    />



                    {/* <Typography variant="subtitle1" gutterBottom>{`Predicted disease: ${prediction} (${confidence}%)`}</Typography> */}

                    <div className="buttonDiv">
                    <Button
                      variant='contained'
                      size='large'
                      onClick={handlePage}
                      style={{
                        fontSize: '1.5rem',
                        marginBottom: '30px',
                        backgroundColor: '#08D9D6', // Changed color
                        color: '#fff', // Text color
                        padding: '15px 30px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)',
                        zIndex: 1
                      }}
                    >
                      Consult
                    </Button>

                    {prediction && <Button
                        variant='contained'
                        size='large'
                        onClick={handleDisease}
                        style={{
                          fontSize: '1.5rem',
                          marginBottom: '30px',
                          backgroundColor: '#08D9D6', // Changed color
                          color: '#fff', // Text color
                          padding: '15px 30px',
                          borderRadius: '10px',
                          boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)',
                          zIndex: 1,
                          marginLeft: '10px'
                        }}
                      >
                        Add To History
                      </Button>}

          </div>


          <div className="buttonDiv">
            <h5> Want to know about {prediction}.Chat with   <span className="gradient2" onClick={isExpanded ? closeDialog : openDialog} style={{cursor:'pointer', fontWeight:'bolder'}}> Health GPT </span><span className="move-arrow">👉</span></h5>
          </div>

                </Box>
            )}            
        </div>
      

      <div className={`chatbot-container ${isExpanded ? "expanded" : ""}`}>
        <div ref={contentRef}>
          <span className="healthgptTitle gradient" onClick={isExpanded ? toggleChatbot : openDialog}>
            <p className="healthgptMargin">Health GPT 🩺</p>
            <span onClick={isExpanded ? closeDialog : openDialog} className="move-arrow healthgptMargin">
              {isExpanded ? <ArrowDownwardSharpIcon style={{ color: 'white' }}/> : <ArrowUpwardSharpIcon style={{ color: 'white' }}/>}
            </span>
          </span>
          {isExpanded && (
            <div className="chat-container-inner">
              <div className="chat-interface">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.user === "User" ? "user-message" : "bot-message"
                    }
                  >
                    {message.text}

                  </div>
                ))}
                <div ref={scrollToBottomRef} /> {/* Added ref for scrolling */}
              </div>
              <div className="chat-input-container">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage(e.target.value);
                      chatbotrequest();
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="dialog-overlay">
              <dialog ref={dialogRef} onDismiss={closeDialog} className="dialog-container">
                <div className="row openaiButtonAlign">
                  <h2>Enter Open API Key🔐 </h2>
                </div>
                <div className="row">
                  <input
                    type="text" placeholder="Enter Open API Key" onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                <div className="row">
                  <div className="col openaiButtonAlign">
                  <button onClick={handleApiKeySubmit} type="button" class="btn btn-primary dialog-buttons">Submit</button>
                  </div>
                  <div className="col openaiButtonAlign">
                  <button onClick={closeDialog} type="button" class="btn btn-primary dialog-buttons">Cancel</button>
                  </div>
                </div>
              </dialog>
      </div>


    </div>
  );
}

export default Dashboard;
