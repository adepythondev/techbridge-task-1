from flask import Flask, 
jsonify, request from 
flask_cors import CORS 
app = Flask(__name__) 
CORS(app) # Enables CORS 
so your frontend can 
talk to it
# Sample task data (or 
# whatever data 
# structure you used for 
# Task 7/8)
TASKS = [ {"id": 1, 
    "title": "Task 1", 
    "description": 
    "HTML/CSS setup", 
    "status": 
    "Completed"},{"id": 
    2, "title": "Task 
    2", "description": 
    "Responsive layout",
    "Responsive layout", 
    "status": 
    "Completed"}, {"id": 
    3, "title": "Task 
    3", "description": 
    "JavaScript 
    interactivity", 
    "status": "In 
    Progress"}, {"id": 
    4, "title": "Task 
    4", "description": 
    "DOM manipulation", 
    "status": "Not 
    Started"}, {"id": 5, 
    "title": "Task 5", 
    "description": 
    "Challenge Hub 
    integration", 
    "status": "Not 
    Started"}, {"id": 6, 
    "title": "Task 6", 
    "description": "API 
    data binding", 
    "status": "Not 
    Started"}, {"id": 7, 
    "title": "Task 7", 
    "description": 
    "Python Flask 
    backend", "status": 
    "Not Started"}, 
    {"id": 8, "title": 
    "Task 8", 
    "description": 
    "Search bar and 
    loading states", 
    "status": "Not 
    Started"}
] 
@app.route('/api/tasks', 
methods=['GET']) def 
get_tasks():
    return 
    jsonify(TASKS), 200
if __name__ == 
'__main__':
    app.run(debug=True)
