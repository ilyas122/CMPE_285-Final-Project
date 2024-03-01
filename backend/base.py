from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gautam@localhost/health'
db = SQLAlchemy(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Event: {self.description}"

    def __init__(self, description):
        self.description = description

def format_event(event):
    return {
        "description": event.description,
        "id": event.id,
        "created_at": event.created_at.isoformat()
    }

@app.route('/')
def home():
    return "Hello World"

@app.route('/event', methods=['POST'])
def create_event():
    description = request.json.get('description')
    event = Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

if __name__ == "__main__":
    app.run(debug=True)
