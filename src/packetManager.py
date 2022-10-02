from dataSaver import dataSaver
from fastapi import APIRouter

router = APIRouter()

class packetManager():
    
    def __init__(self, packetList=[]):
        self.packetList: list = packetList

    #SETTERS

    def setPacketList(self, packetList):
        self.packetList = packetList    
    
    ##GETTERS

    def getPacketList(self):
        return self.packetList


    ##FUNCITONS

    # this is hardcoded to read from the packets.txt file provided by the cutsomer for now, 
    # until we can read the packets from the CAN Bus
    def populatePacketList(self, projectId):
        with open('packets.txt', 'r') as f:
            for line in f:
                fields = line.strip().split(';')
                packet = {'projectId': projectId, 'timestamp': fields[0], 'type': fields[1], 'nodeId': fields[2], 'data': fields[3]}
                self.packetList.append(packet)
        dataSaver.storePackets(self.packetList)

    def savePacket(self, packet):
        return #ideally a status code to confirm it was saved, customer said memory will fill out fast
    
    def deletePacket(self, packet):
        return #status code

    def searchPacket(self, packetAttribute):
        return #the packet or null if not found

    def annotatePacket(self, packet):
        return #status code

    def editPacket(self, attribute, setTo):
        return 

    """
        Arguments: 
            order (int): If equal to 1, list returned in ascending order, else if equal to 0, list returned in decending order
    """
    def sortPackets(self, attribute, order):
        ...

    def filterPackets(self, listOfAttributes):
        ...
    
    def generatePacket(self, listOfAttributes):
        ...