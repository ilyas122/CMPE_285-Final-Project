from flask import Flask, request, jsonify
from flask_cors import CORS
from ml_model import predict_disease
from flask_sqlalchemy import SQLAlchemy
import os.path
import base64
from datetime import datetime
import openai 
import os
from pydantic import BaseModel

chat_history=[]

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}},
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"])
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gautam@localhost/sample'
db = SQLAlchemy(app)
   

# Define Disease model
class Disease(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"Disease(id={self.id}, name='{self.name}')"

def format_disease(disease):
    return {
        "id": disease.id,
        "name": disease.name,
    }

# Define Doctor model
class Doctor(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email=db.Column(db.String(100), nullable=False)
    password=db.Column(db.String(100), nullable=False)
    speciality = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    patients = db.relationship('User', backref='doctor', lazy='dynamic', foreign_keys='User.doctor_id')

    def __repr__(self):
        return f"Doctor(id={self.id}, name='{self.name}', speciality='{self.speciality}', location='{self.location}', contact='{self.contact}', created_at='{self.created_at}')"

def format_doctor(doctor):
    return {
        "id": doctor.id,
        "name": doctor.name,
        "email": doctor.email,
        "password":doctor.password,
        "speciality":doctor.speciality,
        "location":doctor.location,
        "contact":doctor.contact,
        "created_at": doctor.created_at.isoformat(),
    }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    location=db.Column(db.String(100), nullable=True, default="CA")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=True)

    def __repr__(self):
        return f"User: {self.fullname}"

    def __init__(self, fullname, password, email, location, doctor_id):
        self.fullname = fullname
        self.password = password
        self.email = email
        self.location=location
        self.doctor_id = doctor_id

def format_user(user):
    return {
        "id": user.id,
        "fullname": user.fullname,
        "email": user.email,
        "password":user.password,
        "created_at": user.created_at.isoformat(),
        "location":user.location,
        "doctor_id":user.doctor_id
    }



@app.route('/')
def home():
    return "Hello 295"

# API endpoint for doctor signup
@app.route('/doctorsignup', methods=['POST'])
def doctorsignup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    speciality=data.get('speciality')
    location=data.get('location')
    contact=data.get('contact')


    # Check if doctor already exists
    existing_doctor = Doctor.query.filter_by(email=email).first()
    if existing_doctor:
        return jsonify({"error": "Doctor already exists"}), 400

    # Create a new doctor instance
    new_doctor = Doctor(name=name, email=email, password=password, speciality=speciality, location=location, contact=contact)

    # Add the new doctor to the database
    db.session.add(new_doctor)
    db.session.commit()

    return jsonify({"message": "Doctor signed up successfully"}), 201



# API endpoint for user signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    fullname = data.get('fullname')
    email = data.get('email')
    password = data.get('password')
    location=data.get('location')
    doctor_id = data.get('doctor_id')

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # Create a new user instance
    new_user = User(fullname=fullname, email=email, password=password, location=location, doctor_id=doctor_id)

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User signed up successfully"}), 201




# API endpoint for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Find the user by email
    user = User.query.filter_by(email=email).first()

    # Check if the user exists and the password is correct
    if user and user.password == password:
        return jsonify({"message": "User logged in successfully"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401
    

# API endpoint for doctor login
@app.route('/doctorlogin', methods=['POST'])
def doctorlogin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Find the doctor by email
    doctor = Doctor.query.filter_by(email=email).first()

    # Check if the doctor exists and the password is correct
    if doctor and doctor.password == password:
        return jsonify({"message": "Doctor logged in successfully"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401
    


# API endpoint to create a new user
@app.route('/users', methods=['POST'])
def create_user():
    fullname = request.json.get('fullname')
    email = request.json.get('email')
    password = request.json.get('password')
    location=request.json.get('location')
    doctor_id = request.json.get('doctor_id')
    new_user = User(fullname, password, email, location, doctor_id)
    db.session.add(new_user)
    db.session.commit()
    return format_user(new_user)

@app.route('/users', methods=['GET'])
def get_all_users():
    try:
        # Query all users from the database
        users = User.query.all()

        # Convert users to a list of dictionaries
        users_data = [format_user(user) for user in users]

        # Return JSON response with users data
        return jsonify(users_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/doctors', methods=['GET'])
def get_all_doctors():
    try:
        # Query all doctors from the database
        doctors = Doctor.query.all()

        # Convert doctors to a list of dictionaries
        doctors_data = [format_doctor(doctor) for doctor in doctors]

        # Return JSON response with users data
        return jsonify(doctors_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# API endpoint to retrieve a specific user by email
@app.route('/doctors/<email>', methods=['GET'])
def get_doctor(email):
    doctor = Doctor.query.filter_by(email=email).first()
    if doctor is None:
        return jsonify({"error": "Doctor not found"}), 404
    return jsonify(format_doctor(doctor)), 200

# API endpoint to retrieve a specific dcotor by email
@app.route('/users/<email>', methods=['GET'])
def get_user(email):
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return jsonify(format_user(user)), 200

# API endpoint to retrieve a specific user by doctor_id
@app.route('/users/<int:doctor_id>', methods=['GET'])
def get_user_by_doctor_id(doctor_id):
    users = User.query.filter_by(doctor_id=doctor_id).all()
    users_list = [{'id': user.id, 'email': user.email, 'fullname':user.fullname, 'location':user.location} for user in users]
    return jsonify(users_list), 200

# API endpoint to update a user's information
@app.route('/users/<email>', methods=['PUT'])
def update_user(email):
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    data = request.json
    selected_doctor_id = data.get('doctor_id')
    user.doctor_id = selected_doctor_id
    # user.password = data.get('password', user.password)
    db.session.commit()
    return jsonify(format_user(user)), 200




# API endpoint to delete a user
@app.route('/users/<email>', methods=['DELETE'])
def delete_user(email):
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        symptoms = data.get('symptoms', [])
        symptoms = [int(symptom) for symptom in symptoms]
        prediction, confidence = predict_disease(symptoms)

        return jsonify({
            'prediction': prediction,
            'confidence': confidence
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


    
@app.route('/get_chat_history', methods=['GET'])
def get_chat_history():
    try:
        return chat_history
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.json.get('user_input')
    open_api_key_from_request = request.json.get('openai_api_key')
    api_key = open_api_key_from_request

    if not user_input:
        return jsonify({'error': 'No user input provided'}), 400

    try:

        if open_api_key_from_request != api_key:
            return jsonify({'error': 'Invalid API key'}), 401
        client = openai.OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are chatting with HealthGPT, your health assistant. Please ask me any health-related questions."
                },
                {
                    "role": "user",
                    "content": user_input
                }
            ],
            model="gpt-3.5-turbo",  
            max_tokens=100
        )
        answer = response.choices[0].message.content.strip()
        chat_history.append({'user': 'User', 'text': user_input})
        chat_history.append({'user': 'Bot', 'text': answer})

        return jsonify({'answer': answer})

    # except openai.error.OpenAIError as e:
    #     # Handle OpenAI API errors
    #     return jsonify({'error': f'OpenAI API error: {str(e)}'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500



    


if __name__ == "__main__":
    app.run(debug=True)
