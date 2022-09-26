import pymongo
class dataSaver:
    
    def __init__(self):
        ...

    ###functions
    def saveSessionLocal(self, file):
        ...

    def saveCANLocal(self, canBus):
        ...

    def update(projectID, baudRate, initials, name, dbcFile, blacklistFile):
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
            "name": name,
            "dbcFile": dbcFile,
            "blacklistFile": blacklistFile
            }
        }

        x = _mycol.update_one(olddoc, newdoc)

    def createInitialProject(projectID, baudRate, initials, name, dbcFile, blacklistFile):
        # TODO: need to add a way to check if analyst has wifi or not in order to decide which databse to save to
        # Also not sure how to sync local database with the online database for when the analyst gets wifi access back...
        hasWifi = True
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test") if hasWifi else pymongo.MongoClient("mongodb://localhost:27017")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        baudRate = 12

        if baudRate != None and initials != None:

            doc = {
                "_id": projectID,
                "baudRate": baudRate,
                "initials": initials,
                "name": name,
                "dbcFile": dbcFile,
                "blacklistFile": blacklistFile
            }

            x = _mycol.insert_one(doc)

            print(x.inserted_id)

            return
        
        else:
            print("baud rate or initials are null")
    
