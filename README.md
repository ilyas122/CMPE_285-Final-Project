# CMPE_285-Final-Project
SymptomDx: A Symptom Checker Web App
SymptomDx is a web application that helps users understand their symptoms better. Users can input their symptoms and the system will suggest potential diagnoses with confidence scores.

#Demo:
http://disease-prediction-1864546921.us-east-1.elb.amazonaws.com/

This project is built using the following technologies:

# Front-End
HTML, CSS, and React js
The front-end is responsible for providing a user-friendly interface for users to interact with the system. This includes features like:
User registration and login
Symptom selection
Displaying predicted diagnosis and confidence score
Health GPT - chatbot for health related questions

# Back-End
Python (framework - Flask)
The back-end handles the core functionality of the system, including:
Processing user input
Performing symptom checks using a machine learning model (details about the model to be specified)
Communicating with the database to store and retrieve user and symptom data

# Database
Amazon Relational Database Service (RDS) - PostgreSQL
The database stores all of the system's data, such as:
User information (username, password)
Symptom information
Disease information
User symptom history and predicted diagnoses

# Additional Information
This project utilizes AWS services for deployment, including:
EC2 for hosting the back-end server: Amazon EC2 is used to host the back-end server, providing scalable computing capacity in the AWS cloud. It allows for easy deployment and management of the server infrastructure.

RDS for the database: AWS RDS is utilized for the database, offering a managed relational database service that simplifies database setup, operation, and scaling. It ensures high availability, security, and compatibility for the database.

CloudWatch for monitoring: AWS CloudWatch is employed for monitoring the application and AWS resources. It provides metrics, logs, and alarms to help maintain the application's performance and availability.


# Getting Started

# 1.Prerequisites:
Python (version to be specified)
Node.js and npm (or yarn, if using a front-end framework)
AWS account (optional, for deployment)

# 2.Clone the repository:
git clone https://github.com/<your-username>/SymptomDx.git

# 3.Install dependencies:
Navigate to the project directory
cd SymptomDx

Install Python dependencies
pip install -r requirements.txt

Install front-end dependencies (if using a framework):
npm install  // or yarn install

# 4.Run the application:

Prerequisites: Make sure you have Node.js and npm (or yarn if using a package manager) installed on your system. You can check by running node -v and npm -v (or yarn -v) in your terminal.
2.  Run the React Frontend:

Navigate to the directory containing your React frontend code.
Install the project dependencies by running:

npm install
``` (or `yarn install`)

Start the React development server by running:
npm start
``` (or `yarn start`)
This will typically start the development server on `http://localhost:3000` by default (you can check the exact port in your `package.json` or terminal output). This will serve the React app for development purposes.

Run the Flask Backend:

Navigate to the directory containing your Flask backend code.

Install the project dependencies by running:
pip install -r requirements.txt

This will install all the necessary Python libraries required by your Flask application.

Start the Flask development server by running:

python app.py  # Replace 'app.py' with your main Flask script name if different

This will typically start the Flask development server on http://127.0.0.1:5000 by default (you can check the exact port in your Flask app configuration or terminal output). This will serve your Flask API endpoints.

# Access the Application:

With both servers running, you can access your SymptomDx application in a web browser.
The React frontend will typically be accessible at http://localhost:3000 (or the port specified in your React app).
Your Flask backend API endpoints will typically be accessible at http://127.0.0.1:5000 (or the port specified in your Flask configuration). The actual React frontend will make requests to these Flask API endpoints to fetch data and display it to the user.




# 5.Deployment:












Copyright © 2024
Mohammed Ilyas Ahmed, Gautam Vabilisetty, Pushkar Patil, Venkata Narasimha Sai Prudhvi Mokrala
ALL RIGHTS RESERVED


