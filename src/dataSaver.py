import pymongo
class dataSaver:
    
    def __init__(self):
        ...

    ###functions
    def saveSessionLocal(self, file):
        ...

    def saveCANLocal(self, canBus):
        ...

    def update(projectID, baudRate, initials, eventName, dbcFile, blacklistFile):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        olddoc = {
            "_id": projectID
        }

        newdoc = {
            "$set": {
            "baudRate": baudRate,
            "initials": initials,
            "eventName": eventName,
            "dbcFile": dbcFile,
            "blacklistFile": blacklistFile
            }
        }

        x = _mycol.update_one(olddoc, newdoc)

    def createInitialProject(projectID, baudRate, initials, eventName, dbcFile, blacklistFile):
        _myclient = pymongo.MongoClient("mongodb://localhost:27017")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        baudRate = 12

        doc = {
            "_id": projectID,
            "baudRate": baudRate,                
            "initials": initials,
            "eventName": eventName,
            "dbcFile": dbcFile,
            "blacklistFile": blacklistFile
        }

        x = _mycol.insert_one(doc)

        print(x.inserted_id)
    
