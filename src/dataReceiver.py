from dataSaver import dataSaver
import pymongo
import can

class dataReceiver:

    def __init__(self):
        ...
    
    #functions
    def receiveTraffic(self, projectId):
        
        # for vcan0 socket in Kali
        bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=250000)

        msg = bus.recv()
        # packet = [msg.timestamp, msg.arbitration_id, msg.dlc, msg.data]
        # print(msg.timestamp)              type: float
        # print(msg.arbitration_id)         type: int
        # print(msg.channel)                type: str or int or None
        # print(msg.dlc)                    type: int
        # print(msg.data, "\n")             type: bytearray
        # packets.append[packet]
        packet = {'projectId': projectId, 'timestamp': msg.timestamp, 'type': msg.dlc, 
            'nodeId': msg.arbitration_id, 'data': msg.data}
        dataSaver.storePackets(packet)
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
    def retrievePackets(projectID):
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        packets

        for x in _myCol.find({"_id": projectID}, {"_id": 0, "packets": 1}):
            print(x)
            packets = x
        
        return packets
    
    #return archived projects
    def retrieveArchivedProjects():
        _myClient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _myDB = _myClient["TestDB"]
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