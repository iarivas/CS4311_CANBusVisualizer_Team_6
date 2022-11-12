import csv
import pymongo
from typing import Final

with open('../Projects/Test_11_8.csv') as csv_file:
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
    
    print(_newProject[0], '\n')
    print(_newNodes[0], '\n')
    print(_newPackets[0], '\n')

eventName = 'Test_11_11'
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