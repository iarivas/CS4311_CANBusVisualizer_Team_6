from dataSaver import dataSaver
import pymongo
from dataSaver import dataSaver
from typing import Final
from datetime import datetime
import re

localDB: Final[str] = "mongodb://localhost:27017"

class dataGetter:

    def __init__(self):
        ...
    
    #functions
    def receiveTraffic(projectId, dbc, bus):

        _msg = bus.recv()
        _msgInfo = (dbc.get_message_by_frame_id(_msg.arbitration_id))
        _msgData = str(dbc.decode_message(_msg.arbitration_id, _msg.data))

        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestColNodes"]

        # Checks if node is in testCol_Nodes
        if _myCol.find_one({'nodeID': str(_msg.arbitration_id)}) == None:
            node =    {'projectId': projectId,
                    'nodeID': str(_msg.arbitration_id),
                    'name': str(_msgInfo.comment),
                    'data': None,
                    'position': None,
                    'relationships': []}

            dataSaver.storeNodes([node])

        packet =    {'projectId': projectId,
                    'timestamp': datetime.fromtimestamp(_msg.timestamp),
                    'type': str(_msg.dlc),
                    'nodeId': str(_msgInfo.comment),
                    'data': _msgData} 
        dataSaver.storePackets([packet])
        return
    
    def decodePackets(self, packet):
        ...
        
    def createTempFile(self, something):
        ...

    #return all projects in db
    def retrieveAllProjects():
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        store = []

        for x in _myCol.find({} , {"_id": 1, "eventName": 1}):
            store.append(x)
        
        return store

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
    def getPackets(projectID: str, size: int, sort: str, node=None, before=None, after=None):
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
            beforeDate = datetime.strptime(before, '%Y-%m-%dT%H:%M:%S.%f%z')
            afterDate = datetime.strptime(after, '%Y-%m-%dT%H:%M:%S.%f%z')
            beforeAndAfterFilter = {'timestamp': {'$lt': beforeDate, '$gt': afterDate}}
            filterBy.update(beforeAndAfterFilter)
        elif before is not None:
            beforeDate = datetime.strptime(before, '%Y-%m-%dT%H:%M:%S.%f%z')
            beforeFilter = {'timestamp': {'$lt': beforeDate}}
            filterBy.update(beforeFilter)
        elif after is not None:
            afterDate = datetime.strptime(after, '%Y-%m-%dT%H:%M:%S.%f%z')
            afterFilter = {'timestamp': {'$gt': afterDate}}
            filterBy.update(afterFilter)

        # set the node filters
        if node is not None:
            nodeFilter = {'nodeId': node}
            filterBy.update(nodeFilter)

        packetList = []

        for packet in _myCol.find(filterBy, {'_id': False}).sort(sortByField, sortByType).limit(size):
            packet['timestamp'] = packet['timestamp'].strftime('%m/%d/%Y, %H:%M:%S')
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