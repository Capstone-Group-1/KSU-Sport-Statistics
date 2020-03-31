from sqlalchemy import Column, ForeignKey, Integer, String, Numeric, DateTime, ForeignKey, CHAR, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.model import *
import json

engine = create_engine("mysql://" + conf.mysql["user"] + ":" + conf.mysql["passwd"] + "@" + conf.mysql["host"] + "/" + conf.mysql["db"])
base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

#player methods
def GetPlayerData(id, sport):
    playerQuery = ""
    PlayerData = {}

    if sport == "mbb":
        playerQuery = session.query(mbbRoster).filter(mbbRoster.jerseyNo == id).first()
    elif sport == "wbb":
        playerQuery = session.query(wbbRoster).filter(wbbRoster.jerseyNo == id).first()
    elif sport == "baseball":
        playerQuery = session.query(baseballRoster).filter(baseballRoster.jerseyNo == id)
    elif sport == "softball":
        playerQuery = session.query(softballRoster).filter(softballRoster.jerseyNo == id)

    session.close()

    if playerQuery is not None:
        PlayerData = playerQuery.__dict__
        PlayerData.pop('_sa_instance_state', None)

        return json.dumps(PlayerData)

    return "No player with that jersey number."


def GetPlayerStats(id, sport):
    TeamStatsQuery = ""
    PitchingStats = ""
    BattingStats = ""
    FieldingStats = ""

    PitchingItem = ""
    BattingItem = ""
    FieldingItem = ""

    PlayerStatsQuery = ""

    if sport == "baseball":
        PitchingStats = session.query(baseballPitchingStats).filter(baseballPitchingStats.jerseyNo == id).first()
        BattingStats = session.query(baseballBattingStats).filter(baseballBattingStats.jerseyNo == id).first()
        FieldingStats = session.query(baseballFieldingStats).filter(baseballFieldingStats.jerseyNo == id).first()
    elif sport == "softball":
        PitchingStats = session.query(softballPitchingStats).filter(softballPitchingStats.jerseyNo == id).first()
        BattingStats = session.query(softballBattingStats).filter(softballBattingStats.jerseyNo == id).first()
        FieldingStats = session.query(softballFieldingStats).filter(softballFieldingStats.jerseyNo == id).first()
    elif sport == "wbb":
        PlayerStatsQuery = session.query(wbbPlayerStats).filter(wbbPlayerStats.jerseyNo == id).first()
    elif sport == "mbb":
        PlayerStatsQuery = session.query(mbbPlayerStats).filter(mbbPlayerStats.jerseyNo == id).first()

    if sport in ("wbb", "mbb"):
        Basketball = PlayerStatsQuery.__dict__
        Basketball.pop('_sa_instance_state', None)

        return json.dumps(Basketball)

    if sport in ("baseball", "softball"):
        #for pitItem in PitchingStats:
        if PitchingStats != None:
            PitchingItem = PitchingStats.__dict__
            PitchingItem.pop('_sa_instance_state', None)

        #for batItem in BattingStats:
        if BattingStats != None:
            BattingItem = BattingStats.__dict__
            BattingItem.pop('_sa_instance_state', None)

        #for fieldItem in FieldingStats:
        if FieldingStats != None:
            FieldingItem = FieldingStats.__dict__
            FieldingItem.pop('_sa_instance_state', None)

        return json.dumps([{"Pitching": PitchingItem}, {"Batting": BattingItem}, {"Fielding": FieldingItem}])

    return None

#team methods
def GetTeamRoster(sport):
    TeamRoster = []
    TeamQuery = ""

    if sport == "mbb":
        TeamQuery = session.query(mbbRoster).all()
    elif sport == "wbb":
        TeamQuery = session.query(wbbRoster).all()
    elif sport == "baseball":
        TeamQuery = session.query(baseballRoster).all()
    elif sport == "softball":
        TeamQuery = session.query(softballRoster).all()

    for item in TeamQuery:
        TeamMember = {
            "jerseyNum": item.jerseyNo,
            "pictureFile": item.picFileName,
            "firstname": item.firstName,
            "lastname": item.lastName
        }
        TeamRoster.append(TeamMember)
        
    session.close()

    return json.dumps(TeamRoster)


def GetTeamStats(sport):
    TeamStatsQuery = ""
    PitchingStats = ""
    BattingStats = ""
    FieldingStats = ""
    
    Basketball = {}
    Picthing = []
    Batting = []
    Fielding = []

    if sport == "mbb":
        TeamStatsQuery = session.query(mbbTeamStats).first()
    elif sport == "wbb":
        TeamStatsQuery = session.query(wbbTeamStats).first()
    elif sport == "baseball":
        PitchingStats = session.query(baseballPitchingStats).all()
        BattingStats = session.query(baseballBattingStats).all()
        FieldingStats = session.query(baseballFieldingStats).all()
    elif sport == "softball":
        PitchingStats = session.query(softballPitchingStats).all()
        BattingStats = session.query(softballBattingStats).all()
        FieldingStats = session.query(softballFieldingStats).all()

    session.close()

    if sport in ("wbb", "mbb"):
        Basketball = TeamStatsQuery.__dict__
        Basketball.pop('_sa_instance_state', None)

        return json.dumps(Basketball)

    if sport in ("baseball", "softball"):
        for pitItem in PitchingStats:
            PitchingItem = pitItem.__dict__
            PitchingItem.pop('_sa_instance_state', None)
            Picthing.append(PitchingItem)

        for batItem in BattingStats:
            BattingItem = batItem.__dict__
            BattingItem.pop('_sa_instance_state', None)
            Batting.append(BattingItem)

        for fieldItem in FieldingStats:
            FieldingItem = pitItem.__dict__
            FieldingItem.pop('_sa_instance_state', None)
            Fielding.append(FieldingItem)

        return json.dumps([{"Pitching": Picthing}, {"Batting": Batting}, {"Fielding": Fielding}])

    return None