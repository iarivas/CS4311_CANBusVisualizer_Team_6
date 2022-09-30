import pymongo
from typing import Final

localDB: Final[str] = "mongodb://localhost:27017"

class dataSaver:
    
    def __init__(self):
        ...

    ###functions
    def saveSessionLocal(self, file):
        ...

    def saveCANLocal(self, canBus):
        ...

    def update(projectID, baudRate, initials, eventName, dbcFile, blacklistFile, packets, archive):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        oldDoc = {
            "_id": projectID
        }

        newDoc = {
            "$set": {
            "baudRate": baudRate,
            "initials": initials,
            "eventName": eventName,
            "dbcFile": dbcFile,
            "blacklistFile": blacklistFile,
            "packets": packets,
            "archive": archive
            }
        }

        x = _myCol.update_one(oldDoc, newDoc)

    def createInitialProject(projectID, baudRate, initials, eventName, dbcFile, blacklistFile):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        doc = {
            "_id": projectID,
            "baudRate": baudRate,                
            "initials": initials,
            "eventName": eventName,
            "dbcFile": dbcFile,
            "blacklistFile": blacklistFile,
            "packets": None,
            "archive": False
        }
        
        x = _myCol.insert_one(doc)

        print(x.inserted_id)
    
    # TEST THIS FUNCTION WITH LOCAL DB TO SEE HOW MUCH SPACE PACKETS WILL TAKE PLACE
    # CHANGE DB AND COLLECTION REFERENCES AS NEEDED
    def storePackets(projectID, packets):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        _myCol.insert_many(packets)

    #Deletes all packets in collection that have a matching projectID
    def deleteAllPackets(projectID):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        _myCol.delete_many(projectID)
