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

    if sport == "wbb":
        playerQuery = session.query(wbbRoster).filter(wbbRoster.jerseyNo == id).first()

    PlayerData = {
        "jerseyNo": playerQuery.jerseyNo,
        "picture": playerQuery.picFileName,
        "firstname": playerQuery.firstName,
        "lastname": playerQuery.lastName,
        "playerYear": playerQuery.playerYear,
        "playerHeight": playerQuery.playerHeight,
        "position": playerQuery.position,
        "hometown": playerQuery.hometown,
        "highSchool": playerQuery.highSchool
    }
        
    return json.dumps(PlayerData)


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