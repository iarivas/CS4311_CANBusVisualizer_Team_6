class dbcFileManager:
    def __init__(self, dbcFileName, dbcMessageSyntax, dbcSignalSyntax, decodePacketInstructions, identifyActiveNodesIntructions):
        self.dbcFileName = dbcFileName
        self.dbcMessageSyntax = dbcMessageSyntax
        self.dbcSignalSyntax = dbcSignalSyntax
        self.decodePacketInstructions = decodePacketInstructions
        self.identifyActiveNodesIntructions = identifyActiveNodesIntructions
    
    ##SETTERS

    def setDbcFileName(self, dbcFileName):
        self.dbcFileName = dbcFileName
    
    def setDbcMessageSyntax(self, dbcMessageSyntax):
        self.dbcMessageSyntax = dbcMessageSyntax

    def setDbcSignalSyntax(self, dbcSignalSyntax):
        self.dbcSignalSyntax = dbcSignalSyntax
    
    def setDecodePacketInstructions(self, decodePacketInstructions):
        self.decodePacketInstructions = decodePacketInstructions

    def setIdentifyActiveNodesIntructions(self, identifyActiveNodesIntructions):
        self.identifyActiveNodesIntructions = identifyActiveNodesIntructions


    ##GETTERS

    def getDbcFileName(self):
        return self.dbcFileName
    
    def getDbcMessageSyntax(self):
        return self.dbcMessageSyntax

    def getDbcSignalSyntax(self):
        return self.dbcSignalSyntax
    
    def getDecodePacketInstructions(self):
        return self.decodePacketInstructions

    def getIdentifyActiveNodesIntructions(self):
        return self.identifyActiveNodesIntructions

    
    ##FUNCTIONS
    
    def identifyCanBusTopology(self, listOfPackets):
        ...

    def createCanBusTopology(self):
        ...
    
    def identifyActiveNodes(self):
        ...
