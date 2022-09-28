import pymongo
class dataReceiver:

    def __init__(self):
        ...
    
    #functions
    def receiveTraffic(self, something):
        ...
    
    def decodePackets(self, packet):
        ...
        
    def createTempFile(self, something):
        ...

    def retrieveAllProjects():
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        store = []

        for x in _mycol.find({} , {"_id": 1, "eventName": 1}):
            print(x)
            store.append(x)
        
        return store

    def retrieveProject(projectID):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        x = _mycol.find_one({
            "_id": projectID
        })

        print(x)

    def retrieveName(projectID):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        for x in _mycol.find({"_id": projectID}, {"_id": 0, "eventName": 1}):
            print(x)

    def retrieveBaudRate(projectID):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        for x in _mycol.find({"_id": projectID}, {"_id": 0, "baudRate": 1}):
            print(x)
    
    def retrieveDBCFile(projectID):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        for x in _mycol.find({"_id": projectID}, {"_id": 0, "dbcFile": 1}):
            print(x)

    def retrieveBlacklistFile(projectID):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        for x in _mycol.find({"_id": projectID}, {"_id": 0, "blacklistFile": 1}):
            print(x)
    
    def retrieveInitials(projectID):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        for x in _mycol.find({"_id": projectID}, {"_id": 0, "initials": 1}):
            print(x)
    
    def retrieveProjects(eventName):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        for x in _mycol.find({"eventName": eventName}):
            print(x)