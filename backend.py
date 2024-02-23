from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


# Define the route to fetch the JSON data
@app.route('/grades')
def get_grades():
    # Replace 'grades.json' with the path to your JSON file
    # Make sure the JSON file is in the same directory as your Flask app or provide the correct path
    with open('C:\Projects\prank-results\src\Pages\grades.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
