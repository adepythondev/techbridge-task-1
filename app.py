from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

TASKS = [
    {"id": 1, "title": "Task 1", "description": "HTML/CSS setup", "status": "Completed"},
    {"id": 2, "title": "Task 2", "description": "Responsive layout", "status": "Completed"},
    {"id": 3, "title": "Task 3", "description": "JavaScript interactivity", "status": "In Progress"},
    {"id": 4, "title": "Task 4", "description": "DOM manipulation", "status": "Not Started"},
    {"id": 5, "title": "Task 5", "description": "Challenge Hub", "status": "Pending"}
]

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(TASKS)

if __name__ == '__main__':
    app.run(debug=True)
