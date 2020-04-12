from flask import Flask, request
from flask_cors import CORS
import jsonpickle
from storage import *

app = Flask(__name__)
CORS(app)

#player endpoints
#TODO: Bug fix - 500 error on baseball and softball
@app.route("/player", methods=["GET"])
def Player():
    sport = request.args.get("sport")
    id = request.args.get("id")

    data = GetPlayerData(id, sport)
    return data

@app.route("/player/stats", methods=["GET"])
def PlayerStats():
    id = request.args.get("id")
    sport = request.args.get("sport")

    data = GetPlayerStats(id, sport)
    return data

#team endpoints
@app.route("/team/roster", methods=["GET"])
def TeamRoster():
    sport = request.args.get('sport')
    data = GetTeamRoster(sport)
    return data

@app.route("/team/stats", methods=["GET"])
def TeamStats():
    sport = request.args.get('sport')
    data = GetTeamStats(sport)
    return data

@app.route("/team/stats/progress", methods=["GET"])
def TeamStatsProgress():
    sport = request.args.get('sport')
    stat = request.args.get('stat')
    data = GetTeamStatsPerformance(sport, stat)
    return data

if __name__ == "__main__":
    app.run()