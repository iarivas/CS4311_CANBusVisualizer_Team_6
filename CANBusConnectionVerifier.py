class CANBusConnectionVerifier:
    def __init__(self, connectionStatus):
        self.connectionStatus = connectionStatus

    ##SETTERS
    def setConnectionStatus(self, connectionStatus): 
        self.connectionStatus = connectionStatus 

    ##GETTERS
    def getConnectionStatus(self): 
        return self.connectionStatus

    ##FUNCTIONS
    """Determines wheter there's still connection to the CAN Bus"""
    def verifyConnetion():
        ...
