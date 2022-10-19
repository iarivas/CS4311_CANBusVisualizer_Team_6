import pymongo
from dataSaver import dataSaver
from typing import Final
import datetime

localDB: Final[str] = "mongodb://localhost:27017"

class dataGetter:

    def __init__(self):
        ...
    
    #functions

    def receiveTraffic( projectId, dbc, bus):

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
                    'timestamp': str(datetime.datetime.fromtimestamp(_msg.timestamp))[:-3],
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

        if sort == "timeAsc":
            field = "timestamp"
            sortType = pymongo.ASCENDING
        elif sort == "timeDesc":
            field = "timestamp"
            sortType = pymongo.DESCENDING
        elif sort == "idAsc":
            field = "nodeId"
            sortType = pymongo.ASCENDING
        else:
            field = "nodeId"
            sortType = pymongo.DESCENDING

        if node is not None:
            findQuery = {'projectId': projectID, 'nodeId': node}
        else:
            findQuery = {'projectId': projectID}

        packetList = []

        for packet in _myCol.find(findQuery, {'_id': False}).sort(field, sortType).limit(size):
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