from flask import Flask, request
from flask_cors import CORS
import jsonpickle
from storage import *

app = Flask(__name__)
CORS(app)

#player endpoints
@app.route("/player", methods=["GET"])
def Player():
    sport = request.args.get("sport")
    id = request.args.get("id")

    data = GetPlayerData(id, sport)

    return data

@app.route("/player/improvement", methods="GET")
def PlayerImprovements():
    pass

#team endpoints
@app.route("/team", methods=["GET"])
def Team():
    id = request.args.get('id')

    return "Team Endpoint id " + id

if __name__ == "__main__":
    app.run()