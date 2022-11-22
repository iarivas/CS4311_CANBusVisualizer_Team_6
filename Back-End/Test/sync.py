import json, csv
import pymongo
from typing import Final
localDB: Final[str] = "mongodb://localhost:27017" 

def mergeSelectedProject(eventName, eventName2, type):
        if type == 'json':
            f = open('../Projects/'+ eventName2 + '.json')
            data = json.load(f)
            
            _newNodes = data["Nodes"]
            _newPackets = data["Packets"]

            for i in _newNodes:
                del i['_id']
                i["projectId"] = eventName

            for i in _newPackets:
                del i['_id']
                i["projectId"] = eventName
        elif type == 'csv':
            with open('../Projects/' + eventName2 + '.csv') as csv_file:
                csv_reader = list(csv.reader(csv_file, delimiter=','))
                keys = []
                _newProject = []
                _newNodes = []
                _newPackets = []
                i = 0

                # Gets to the project keys
                while(csv_reader[i] != ['Project']):
                    i = i + 1
                i = i + 1
                keys = csv_reader[i]
                i = i + 1

                while(csv_reader[i] != ['Nodes']):
                    res = {keys[j]: csv_reader[i][j] for j in range(len(keys))}
                    _newProject.append(res)
                    i = i + 1
                i = i + 1
                keys = csv_reader[i]
                i = i + 1

                while(csv_reader[i] != ['Packets']):
                    res = {keys[j]: csv_reader[i][j] for j in range(len(keys))}
                    _newNodes.append(res)
                    i = i + 1
                i = i + 1
                keys = csv_reader[i]
                i = i + 1

                for k in range(i, len(csv_reader)):
                    res = {keys[j]: csv_reader[k][j] for j in range(len(keys))}
                    _newPackets.append(res)

                for i in _newProject:
                    i["baudRate"] = int(i["baudRate"])
                    i["eventName"] = eventName
                    i["blacklistFile"] = None
                    if i["archive"] == "\"True\"":
                        i["archive"] = True
                    else: i["archive"] = False

                for i in _newNodes:
                    del i['_id']
                    i["projectId"] = eventName
                    i["position"] = json.loads((i["position"].replace("\'", "\"" )))
                    if i["isBlacklisted"] == "\"True\"":
                        i["isBlacklisted"] = True
                    else: i["isBlacklisted"] = False
                    i["relationships"] = []

                for i in _newPackets:
                    del i['_id']
                    i["projectId"] = eventName
                    i['timestamp'] = json.loads(i['timestamp'].replace("\'", "\"" ))
        
        # We are assuming we keep our original projects configuration
        #dataSaver.storeProject(_newProject)
        #dataSaver.storeNodes(_newNodes)

        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestColNodes"]
        _myCol.insert_many(_newNodes)

        #dataSaver.storePackets(_newPackets)

        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        _myCol.insert_many(_newPackets)
        return