from flask import Flask
from flask_cors import CORS
import jsonpickle
from models.example import Example

app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return "Welcome to flask!"

@app.route("/examples")
def examples():
    return jsonpickle.encode([Example(i, 'example') for i in range(5)], unpicklable=False)

if __name__ == "__main__":
    app.run()
