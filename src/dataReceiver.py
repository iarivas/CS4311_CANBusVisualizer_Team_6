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

    def retrieveProject(projectID):
        _myclient = pymongo.MongoClient("mongodb+srv://Dillon:v4nbq3GP8Cyb3p4@software2.akghm64.mongodb.net/test")
        _mydb = _myclient["TestDB"]
        _mycol = _mydb["TestCol"]

        x = _mycol.find_one({
            "_id": projectID
        })

        print(x)