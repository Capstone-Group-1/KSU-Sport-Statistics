# KSU-Sport-Statistics

# Backend
Install python3 and (preferrably) create a virtual environment for the python libraries to be installed. (command is "python3 -m venv path/to/venv") (you may have to install venv also).
Install pip3 for python3 and then run "pip3 install -r requirements.txt" to install all libraries from the requirements.txt file.
Run the command "python3 app.py" to start the application.

# Frontend
Install node.js at this link: https://nodejs.org/en/download/.
Install the angular client using command "npm install -g @angular/cli".
Install all node packages using command "npm i".
Run angular front end using command "ng serve".

# Running both frontend and backend
Run "python3 app.py" and "ng serve" in separate terminals (or run as background processes).
Cmd + click (control click for windows) on the url (should be something like http://localhost:4200/) to get to the application.
Go to http://localhost:4200/example to test the integration between Flask and Angular.

# API Endpoints
/team/roster

Gets team roster

Takes one argument. ?sport=whatever
ex: http://127.0.0.1:5000/team/roster?sport=mbb

Returns a list of dictionaries.
ex: [{"jerseyNum": 45, "lastname": "wolfe", "pictureFile": "empic.png", "firstname": "em"}]

Possible arguments to be passed:

mbb - Men's Basketball
wbb - Women's Basketball
baseball - Baseball
softball - Softball


/team/stats

Gets team overall stats

Takes one argument. ?sport=whatever
ex: http://127.0.0.1:5000/team/stats?sport=wbb

Returns a dictionary of stats for basketball
{"playerJerseys": "3, 4, 14, 31, 44, 32, 5, 20, 25, 15, 23", "3ptA": 548.0, "rebMargin": -1.1, "steals": 198.0, "scoringMargin": 3.5, "toMargin": 2.8, "record": "17-10, 10-6", "attendance": 22120.0, "3ptM": 172.0, "ftM": 382.0, "blocks": 110.0, "fieldGoalA": 1682.0, "asts": 308.0, "rebs": 986.0, "ftA": 536.0, "currentStreak": "3", "points": 1900.0, "fieldGoalM": 673.0, "last10": "69, 60, 61, 57, 60, 87, 58, 80, 68, 96", "pointsOffTos": 17.9, "tos": 363.0}

Returns a dictionary of dictionaries for baseball/softball


Possible arguments to be passed:

mbb - Men's Basketball
wbb - Women's Basketball
baseball - Baseball
softball - Softball



/player

Gets specified player

Takes two arguments. ?id=12&sport=whatever
http://127.0.0.1:5000/player?id=2&sport=wbb

Returns a dictionary of the player information if its found.
{"highSchool": "Lakeview", "lastName": "Pavlansky", "jerseyNo": 2, "playerYear": 2, "firstName": "Annie", "picFileName": "Pavlansky_Annie.JPG", "hometown": "Cortland, Ohio", "playerHeight": "6'0\"", "position": "G/F"}


Possible arguments to be passed:

mbb - Men's Basketball
wbb - Women's Basketball
baseball - Baseball
softball - Softball


/player/stats

Gets specified player stats

Takes two arguments. ?id=12&sport=whatever
http://127.0.0.1:5000/player/stats?id=2&sport=wbb

Returns a dictionary of dictionaries for baseball and softball
[{"Pitching": ""}, {"Batting": {"jerseyNo": 2, "gamesStarted": 1, "atBats": 3.0, "homeRuns": 0.0, "shs": 1.0, "gdps": 0.0, "rbis": 0.0, "triples": 0.0, "runs": 2.0, "hbps": 1.0, "walks": 1.0, "totalBases": 2.0, "hits": 2.0, "gamesPlayed": 9, "sbAttempts": 3.0, "sfbs": 0.0, "sbs": 2.0, "strikeOuts": 0.0, "doubles": 0.0}}, {"Fielding": ""}]

Returns a dictionary for mens and womens basketball
{"tos": 3.0, "fieldGoalA": 13.0, "gamesStarted": 0, "fieldGoalM": 2.0, "blocks": 0.0, "dReb": 8.0, "gamesPlayed": 14, "ftM": 0.0, "oReb": 0.0, "3ptA": 11.0, "jerseyNo": 2, "ftA": 0.0, "minutesPlayed": 50.0, "points": 6.0, "asts": 4.0, "personalFouls": 4.0, "3ptM": 2.0, "steals": 1.0}

Possible arguments to be passed:

mbb - Men's Basketball
wbb - Women's Basketball
baseball - Baseball
softball - Softball


/team/stats/performance

Coming soon...