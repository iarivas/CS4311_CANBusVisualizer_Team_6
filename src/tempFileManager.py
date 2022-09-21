class tempFileManager:
    def __init__(self, listOfNodes, blacklist, packet, setting):
        self._listOfNodes = listOfNodes
        self._blacklsit = blacklist
        self._packet = packet
        self._setting = setting
    
    def getListOfNodes():
        return self._listOfNodes
    
    def getBlacklist():
        return self._blacklsit
    
    def getPacket():
        return self._packet

    def getSetting():
        return self._setting
    
    def setListOfNodes(listOfNodes):
        self._listOfNodes = listOfNodes
    
    def setBlacklist(blacklist):
        self._blacklsit = blacklist

    def setPacket(packet):
        self._packet = packet

    def setSetting(setting):
        self._setting = setting

    def writeToTempFile():
        return
    
    def readFromTempFile():
        return

    