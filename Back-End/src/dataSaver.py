import pymongo
import cantools
from typing import Final

localDB: Final[str] = "mongodb://localhost:27017"


class dataSaver:

    def __init__(self):
        ...

    # functions
    def saveSessionLocal(self, file):
        ...

    def saveCANLocal(self, canBus):
        ...

    def updateIndivial(projectID, baudRate, initials, eventName, dbcFile, blacklistFile, archive):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestCol"]

        toChange = {"$set": {}}
        if baudRate:
            toChange['$set']['baudRate'] = baudRate

        if initials != None:
            toChange['$set']['initials'] = initials

        if eventName != None:
            toChange['$set']['eventName'] = eventName

        if dbcFile != None:
            toChange['$set']['dbcFile'] = dbcFile

        if blacklistFile != None:
            toChange['$set']['blacklistFile'] = blacklistFile

        if archive != None:
            toChange['$set']['archive'] = archive

        x = _myCol.update_many({"_id": projectID}, toChange)

    def update(projectID, baudRate, initials, eventName, dbcFile, blacklistFile, archive):
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
            "archive": False
        }

        x = _myCol.insert_one(doc)

        print(x.inserted_id)

    def storePackets(packets):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        _myCol.insert_many(packets)

    # Deletes all packets in collection that have a matching projectID
    def deleteAllPackets(projectID):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        _myCol.delete_many({'projectId': projectID})

    def deleteAll():
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        _myCol.delete_many({})

    def storeNodes(nodes):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestColNodes"]

        _myCol.insert_many(nodes)

    def updateNodes(projectID, updatedNodeList):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]

        _myCol = _myDB["TestColNodes"]

        for node in updatedNodeList:
            _myCol.update_one({"projectId": projectID, "nodeID": node["nodeID"]}, {"$set": {
                              "data": node["data"], "name": node["name"], "position": node["position"], "relationships": node["relationships"]}})


# This is meant for testing purposes only, in order to allow the quick and
# easy deletiong of all packets from the db, uncomment as needed
'''def main():
    dataSaver.deleteAll() # deletes all packets from the packets db only

if __name__ == "__main__":
    main()
'''
