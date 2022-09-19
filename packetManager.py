class packetManager:
    
    def __init__(self, packetList):
        self.packetList = packetList

    #SETTERS

    def setPacketList(self, packetList):
        self.packetList = packetList    
    
    ##GETTERS

    def getPacketList(self):
        return self.packetList


    ##FUNCITONS

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