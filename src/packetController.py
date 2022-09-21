class packetController(object):
    def __init__(self, B_editPackets, B_replayPackets, B_canBusMenu):
        self._B_editPackets = B_editPackets
        self._B_replayPackets = B_replayPackets
        self._B_canBusMenu = B_canBusMenu
    
    ## Setters
    def setEditPacketsButton(self, B_editPackets):      
        self._B_editPackets = B_editPackets
    def setReplayPacketsButton(self, B_replayPackets):  
        self._B_replayPackets = B_replayPackets
    def setCanBusMenuButton(self, B_canBusMenu):        
        self._B_canBusMenu = B_canBusMenu

    ## Getters
    def getEditPacketsButton(self):     return self._B_editPackets
    def getReplayPacketsButton(self):   return self._B_replayPackets
    def getCanBusMenuButton(self):      return self._B_canBusMenu

    ## Functions
    # Passes selected packet to packetManager and opens editPacket menu
    def editPacket(self, packet):
        return
    
    # Passes selected packet to packetManager and opens replayPacket menu
    def editPacket(self, packet):
        return

    # Opens canBus menu
    def canBusMenu(self):
        return