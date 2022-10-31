class tempFileManager:
    def __init__(self, listOfNodes, blacklist, listOfPackets, settings):
        self._listOfNodes = listOfNodes
        self._blacklsit = blacklist
        self._listOfPackets = listOfPackets
        self._settings = settings

    # GETTERS

    def getListOfNodes(self):
        return self._listOfNodes

    def getBlacklist(self):
        return self._blacklsit

    def getListOfPackets(self):
        return self._listOfPackets

    def getSettings(self):
        return self._settings

    # SETTERS

    def setListOfNodes(self, listOfNodes):
        self._listOfNodes = listOfNodes

    def setBlacklist(self, blacklist):
        self._blacklsit = blacklist

    def setListOfPackets(self, listOfPackets):
        self._listOfPackets = listOfPackets

    def setSettings(self, settings):
        self._settings = settings

    def writeToTempFile():
        return

    def readFromTempFile():
        return
