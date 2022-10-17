from fastapi import APIRouter
from pydantic import BaseModel
import can
import cantools
from dataSaver import dataSaver
from dataGetter import dataGetter
from typing import Union

bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=250000)
dbc = cantools.database.load_file('/home/cbvs/Desktop/dbcFile.dbc')
router = APIRouter()

class Play(BaseModel):
    play: bool


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

    def populatePacketList(self, projectId):

        # this is hardcoded to read from the packets.txt file provided by the cutsomer for now, 
        # until we can read the packets from the CAN Bus

        # with open('packets.txt', 'r') as f:
        #     for line in f:
        #         fields = line.strip().split(';')
        #         packet = {'projectId': projectId, 'timestamp': fields[0], 'type': fields[1],
        #            'nodeId': fields[2], 'data': fields[3]}
        #         self.packetList.append(packet)
        
        #semi Hardcoded for demos sake until discussed how we would rearrange threading 
        #dataGetter.receiveTraffic(projectId)

        # for p in packets:
        #     packet = {'projectId': projectId, 'timestamp': p[0], 'type': p[2], 
        #         'nodeId': p[1], 'data': p[3]}
        #     self.packetList.append(packet)
        # dataSaver.storePackets(self.packetList)
        return

    #needs to be updated to get packet from DB and modified before being sent
    #https://python-can.readthedocs.io/en/master/message.html?highlight=message
    def sendPackets(arbitrationID, data):
        msg = dbc.get_message_by_frame_id(arbitrationID)
        msg = can.Message(arbitration_id=arbitrationID, data = msg.encode(data), is_extended_id = False)
        bus.send(msg)

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

    @router.get("/projects/{projectId}/packets", tags=["packets"])
    def getPacketsFromProject(projectId: str, size: int, sort: str, node: Union[str, None] = None, before: Union[str, None] = None, after: Union[str, None] = None):
        return dataGetter.getPackets(projectId, size, sort, node, before, after)

    @router.put("/projects/{projectId}/play", tags=["play"])
    def getLivePackets(projectId: str, play: Play):
        i = 1
        while(play and i <= 10):
            dataGetter.receiveTraffic(projectId, dbc, bus)
            i += 1
        return 