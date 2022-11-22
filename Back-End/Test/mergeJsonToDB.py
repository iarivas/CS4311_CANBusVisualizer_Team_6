import json
import pymongo
import time, datetime
from typing import Final

def Import(proj):

    f = open('../Projects/'+ proj +'.json')
    data = json.load(f)

    # We are kepeing the Original Project configuration

    eventName = 'Test_11_5'
    _newProject = data["Project"]
    _newNodes = data["Nodes"]
    _newPackets = data["Packets"]

    for i in _newNodes:
        del i['_id']
        i["projectId"] = eventName

    for i in _newPackets:
        del i['_id']
        i["projectId"] = eventName

    localDB: Final[str] = "mongodb://localhost:27017"

    _myClient = pymongo.MongoClient(localDB)
    _myDB = _myClient["TestDB"]
    _myCol = _myDB["TestCol"]

    _myCol.insert_many(_newProject)

    _myClient = pymongo.MongoClient(localDB)
    _myDB = _myClient["TestPDB"]
    _myCol = _myDB["TestColNodes"]

    _myCol.insert_many(_newNodes)

    _myClient = pymongo.MongoClient(localDB)
    _myDB = _myClient["TestPDB"]
    _myCol = _myDB["TestCol"]

    _myCol.insert_many(_newPackets)