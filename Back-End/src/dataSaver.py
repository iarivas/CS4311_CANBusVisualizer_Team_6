import pymongo
from typing import Final
from dataGetter import dataGetter

localDB: Final[str] = "mongodb://localhost:27017"

class dataSaver:
    
    def __init__(self):
        ...

    ###functions
    def saveSessionLocal(self, file):
        ...

    def saveCANLocal(self, canBus):
        ...

    def receiveTraffic(self, projectId, dbc, bus):

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
                    'data': Any,
                    'position': None,
                    'relationships': []}

            self.storeNodes([node])

        packet =    {'projectId': projectId,
                    'timestamp': str(datetime.fromtimestamp(_msg.timestamp))[:-3],
                    'type': str(_msg.dlc),
                    'nodeId': str(_msgInfo.comment),
                    'data': _msgData} 
        self.storePackets([packet])
        return

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
    
    # TEST THIS FUNCTION WITH LOCAL DB TO SEE HOW MUCH SPACE PACKETS WILL TAKE PLACE
    # CHANGE DB AND COLLECTION REFERENCES AS NEEDED
    def storePackets(packets):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestPDB"]
        _myCol = _myDB["TestCol"]

        _myCol.insert_many(packets)

    #Deletes all packets in collection that have a matching projectID
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
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestColNodes"]

        _myCol.insert_many(nodes)

    def updateNodes(projectID, updatedNodeList):
        _myClient = pymongo.MongoClient(localDB)
        _myDB = _myClient["TestDB"]
        _myCol = _myDB["TestColNodes"]

        dbNodeList = dataGetter.getNodes(projectID)

        for node in updatedNodeList:
            if node not in dbNodeList:
                _myCol.update_one({"nodeId": node["nodeId"]}, {"$set": {"data": node["data"], "name": node["name"], "position": node["position"], "relationship": node["relationship"]}})


# This is meant for testing purposes only, in order to allow the quick and
# easy deletiong of all packets from the db, uncomment as needed
'''def main():
    dataSaver.deleteAll() # deletes all packets from the packets db only

if __name__ == "__main__":
    main()
'''