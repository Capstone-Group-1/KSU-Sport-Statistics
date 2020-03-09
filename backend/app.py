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

@app.route("/player/improvement", methods=["GET"])
def PlayerImprovements():
    pass

#team endpoints
@app.route("/team/roster", methods=["GET"])
def TeamRoster():
    sport = request.args.get('sport')
    data = GetTeamRoster(sport)
    return data

if __name__ == "__main__":
    app.run()