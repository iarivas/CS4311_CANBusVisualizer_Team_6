from dataSaver import dataSaver
import pymongo, re, json, csv
from typing import Final
from datetime import datetime
from bson.json_util import dumps
from pymongo import MongoClient
#import pandas as pd

localDB: Final[str] = "mongodb://localhost:27017"

class dataGetter:

    def __init__(self):
        ...
    
    #functions
    def receiveTraffic(projectId, dbc, bus):

        _msg = bus.recv()
        try:
            _msgInfo = (dbc.get_message_by_frame_id(_msg.arbitration_id))
            try:
                _msgData = str(dbc.decode_message(_msg.arbitration_id, _msg.data))
            
            except :
                print("bitstruct.Error ", _msg.data)
                return

            _myClient = pymongo.MongoClient(localDB)
            _myDB = _myClient["TestPDB"]
            _myCol = _myDB["TestColNodes"]

            # Checks if node is in testCol_Nodes
            if _myCol.find_one({'nodeID': str(_msg.arbitration_id+2147483648)}) == None:
                node =    {'projectId': projectId,
                        'nodeID': str(_msg.arbitration_id+2147483648), #Note sure why but the 2147483648 is needed to match up with the cangen node ID
                        'name': str(_msgInfo.comment),
                        'data': None,
                        'position': None,
                        'isBlacklisted': False,
                        'relationships': []}

                dataSaver.storeNodes([node])

            packet =    {'projectId': projectId,
                        'timestamp': datetime.fromtimestamp(_msg.timestamp),
                        'type': str(_msg.dlc),
                        'nodeId': str(_msgInfo.comment),
                        'data': _msgData} 
            dataSaver.storePackets([packet])
        except KeyError:
            print("KeyError", _msg.arbitration_id)

        return
    
    def decodePackets(self, packet):
        ...
        
    def createTempFile(self, something):
        ...

    #return all projects in db
    def getAllProjects(isArchived: bool):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        projects = []

        filterBy = {'archive': isArchived} if isArchived != None else {}

        for project in _myCol.find(filterBy):
            projects.append(project)
        
        return projects

    #return project matching projectID
    def retrieveProject(projectID):
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        x = _myCol.find_one({
            "_id": projectID
        })
        print(x)

    #return name of project matching projectID
    def retrieveName(projectID):
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        name

        for x in _myCol.find({"_id": projectID}, {"_id": 0, "eventName": 1}):
            print(x)
            name = x
        
        return name

    #return baudRate of project matching projectID
    def retrieveBaudRate(projectID):
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        baudRate

        for x in _myCol.find({"_id": projectID}, {"_id": 0, "baudRate": 1}):
            print(x)
            baudRate = x
        
        return baudRate
    
    #return dbcFile of project matching projectID
    def retrieveDBCFile(projectID):
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        dbcFile

        for x in _myCol.find({"_id": projectID}, {"_id": 0, "dbcFile": 1}):
            print(x)
            dbcFile = x
        
        return dbcFile

    #return blacklistFile of project matching projectID
    def retrieveBlacklistFile(projectID):
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        blacklistFile

        for x in _myCol.find({"_id": projectID}, {"_id": 0, "blacklistFile": 1}):
            print(x)
            blacklistFile = x
        
        return blacklistFile
    
    #return initials of project matching projectID
    def retrieveInitials(projectID):
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        initials

        for x in _myCol.find({"_id": projectID}, {"_id": 0, "initials": 1}):
            print(x)
            initials = x
        
        return initials

    ##return packets of project matching projectID
    def getPackets(projectID: str, size: int, sort: str, page: int, node=None, before=None, after=None):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        isTime = re.search('^time', sort)

        # set the sorting fields and types
        sortByField = "timestamp" if isTime != None else "nodeId"
        startIndex = 4 if sortByField == "timestamp" else 2
        sortByType = pymongo.ASCENDING if sort.endswith("Asc", startIndex) else pymongo.DESCENDING

        # set the filtering fields
        filterBy = {'projectId': projectID}

        # set the time filters
        if before is not None and after is not None:
            beforeDate = datetime.strptime(before, '%Y-%m-%dT%H:%M:%S.%f')
            afterDate = datetime.strptime(after, '%Y-%m-%dT%H:%M:%S.%f')
            beforeAndAfterFilter = {'timestamp': {'$lt': beforeDate, '$gt': afterDate}}
            filterBy.update(beforeAndAfterFilter)
        elif before is not None:
            beforeDate = datetime.strptime(before, '%Y-%m-%dT%H:%M:%S.%f')
            beforeFilter = {'timestamp': {'$lt': beforeDate}}
            filterBy.update(beforeFilter)
        elif after is not None:
            afterDate = datetime.strptime(after, '%Y-%m-%dT%H:%M:%S.%f')
            afterFilter = {'timestamp': {'$gt': afterDate}}
            filterBy.update(afterFilter)

        # set the node filters
        if node is not None:
            nodeFilter = {'nodeId': node}
            filterBy.update(nodeFilter)

        packetList = []

        for packet in _myCol.find(filterBy, {'_id': False}).sort(sortByField, sortByType).skip(((page - 1) * size) if page > 0 else 0).limit(size):
            if(isinstance(packet['timestamp'], datetime)):
                packet['timestamp'] = packet['timestamp'].strftime('%Y-%m-%dT%H:%M:%S.%f')
            elif(isinstance(packet['timestamp'], str)):
                return packetList
            else:
                packet['timestamp'] = packet['timestamp']["$date"]
            packetList.append(packet)
            
        return packetList

    def getNodes(projectID: str):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestColNodes"]

        nodeList = []

        for node in _myCol.find({'projectId': projectID}, {'_id': False}):
            nodeList.append(node)

        return nodeList
    
    #return archived projects
    def retrieveArchivedProjects():
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        store = []

        for x in _myCol.find({"archive": True}):
            store.append(x)
        
        return store
    def retrieveSingleProject(projectId):
        client = MongoClient('localhost', 27017)
        
        db = client.TestDB
        projCollection = db.TestCol
        project = projCollection.find_one({"_id": projectId})
        return project
        
    #return projects matching eventName
    def retrieveProjects(eventName):
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        store = []

        for x in _myCol.find({"eventName": eventName}):
            print(x)
            store.append(x)
        
        return store

    def exportSelectedProject(_projName, type):
        print(type)
        client = MongoClient('localhost', 27017)
        
        db = client.TestDB
        projCollection = db.TestCol
        projCursor = list(projCollection.find({'eventName': _projName}))

        pdb = client.TestPDB
        nodeCollection = pdb.TestColNodes
        nodeCursor = list(nodeCollection.find({'projectId': _projName}))

        packetCollection = pdb.TestCol
        packetCursor = list(packetCollection.find({'projectId': _projName}))

        if type == 'json':
            json_project = dumps(projCursor, indent = 2) 
            json_nodes = dumps(nodeCursor, indent = 2) 
            json_packets = dumps(packetCursor, indent = 2)

            file = '../Projects/' + _projName +'.json'
            print("#######################", file)
            with open(file, 'w') as file:
                file.write("{\n\"Project\": " + json_project + ",\n")
                file.write("\"Nodes\": " + json_nodes + ",\n")
                file.write("\"Packets\": " + json_packets + "}\n")

        elif type == 'csv':
            with open('../Projects/' + _projName + '.csv', 'w') as f:
                w = csv.DictWriter(f, ['Project'])
                w.writeheader()
                w = csv.DictWriter(f, projCursor[0].keys())
                w.writeheader()
                for i in projCursor:
                    w = csv.DictWriter(f, i.keys())
                    w.writerow(i)  

                w = csv.DictWriter(f, ['Nodes'])
                w.writeheader()
                if nodeCursor != []:
                    w = csv.DictWriter(f, nodeCursor[0].keys())
                    w.writeheader()
                    for i in nodeCursor:
                        w = csv.DictWriter(f, i.keys())
                        w.writerow(i) 

                w = csv.DictWriter(f, ['Packets'])
                w.writeheader()
                if packetCursor != []:
                    w = csv.DictWriter(f, packetCursor[0].keys())
                    w.writeheader()
                    for i in packetCursor:
                        w = csv.DictWriter(f, i.keys())
                        w.writerow(i) 
        return

    def importSelectedProject(_projPath, type):
        if type == 'json':
            f = open(_projPath)
            data = json.load(f)

            _newProject = data["Project"]
            _newNodes = data["Nodes"]
            _newPackets = data["Packets"]
        elif type == 'csv':
            with open(_projPath) as csv_file:
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
                i["blacklistFile"] = None
                if i["archive"] == "\"True\"":
                    i["archive"] = True
                else: i["archive"] = False

            for i in _newNodes:
                del i['_id']
                i["position"] = json.loads((i["position"].replace("\'", "\"" )))
                if i["isBlacklisted"] == "\"True\"":
                    i["isBlacklisted"] = True
                else: i["isBlacklisted"] = False
                i["relationships"] = []

            for i in _newPackets:
                del i['_id']
                i['timestamp'] = json.loads(i['timestamp'].replace("\'", "\"" ))

        dataSaver.storeProject(_newProject)
        dataSaver.storeNodes(_newNodes)
        dataSaver.storePackets(_newPackets)
        return

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
        dataSaver.storeNodes(_newNodes)
        dataSaver.storePackets(_newPackets)
        return

    def syncSelectedProject(self, eventName, eventName2, type):
        # creates a Json file of the current project
        self.exportSelectedProject(eventName, type)

        # TODO
        # Still need to send my file to other computer

        # Merges eventName2 file in /Back-End/Projects
        self.mergeSelectedProject(eventName, eventName2, type)
        return