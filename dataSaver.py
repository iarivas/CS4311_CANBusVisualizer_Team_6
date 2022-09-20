class dataSaver:
    
    def __init__(self):
        ...

    ###functions
    def saveSessionLocal(self, file):
        ...

    def saveCANLocal(self, canBus):
        ...

    #i assume the save project responsibility saves it to the database
    def save(projectConfig, canBusNodes, savedPackets):
        import pymongo
        myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        mydb = myclient["TestDB"]
        mycol = mydb["TestCol"]

        doc = {"name": "Test", "project": "Test"}

        x = mycol.insert_one(doc)

        print(x.inserted_id)

        
