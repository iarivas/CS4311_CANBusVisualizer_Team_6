class dataSaver:
    
    def __init__(self):
        ...

    ###functions
    def saveSessionLocal(self, file):
        ...

    def saveCANLocal(self, canBus):
        ...

    def update(projectID, baudRate, initials, name, dbcFile, blacklistFile):
        import pymongo
        myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        mydb = myclient["TestDB"]
        mycol = mydb["TestCol"]

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

        x = mycol.update_one(olddoc, newdoc)

    def createInitialProject(projectID, baudRate, initials, name, dbcFile, blacklistFile):
        import pymongo
        myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        mydb = myclient["TestDB"]
        mycol = mydb["TestCol"]

        if baudRate != None and initials != None:

            doc = {
                "_id": projectID,
                "baudRate": baudRate,
                "initials": initials,
                "name": name,
                "dbcFile": dbcFile,
                "blacklistFile": blacklistFile
            }

            x = mycol.insert_one(doc)

            print(x.inserted_id)

            return
        
        else:
            print("baud rate or initials are null")
    
