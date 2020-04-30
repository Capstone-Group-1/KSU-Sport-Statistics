import csv
import glob
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

path = "files/*.csv"

for fileName in glob.glob(path):
    fileNameFullPath = fileName.split('/')

    table = fileNameFullPath[1].split('.')

    with open(fileNameFullPath[0] + "/" + fileNameFullPath[1]) as file:
        rd = csv.DictReader(file, delimiter=',')
        for row in rd:

            columns = ', '.join("`" + str(x) + "`" for x in row.keys())
            values = ', '.join("'" + str(x) + "'" for x in row.values())
            sql = "INSERT INTO %s ( %s ) VALUES ( %s );" % (table[0], columns, values)

            session.execute(sql)
            session.commit()