from datetime import datetime
#from sqlite3 import Timestamp
import time
#from tokenize import String
from fastapi import APIRouter
from pydantic import BaseModel
import can
import cantools
from dataSaver import dataSaver
from dataGetter import dataGetter
from typing import Union, List

#bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=250000)
dbc = cantools.database.load_file('../CSS-Electronics-SAE-J1939-2018-08_v1.2.dbc')
router = APIRouter()

class Play(BaseModel):
    play: bool

class packet(BaseModel):
    timestamp: str
    nodeId: str
    type: str
    data: str

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
    # please leave for testing purposes - montse
    # def populatePacketList(self, projectId):

    #     # this is hardcoded to read from the packets.txt file provided by the cutsomer for now, 
    #     # until we can read the packets from the CAN Bus
    #     i = 0

    #     with open('packets.txt', 'r') as f:
    #         for line in f:
    #             fields = line.strip().split(';')
    #             now = time.time()
    #             t = datetime.fromtimestamp(now)
    #             #timestampStr = now.strftime("%m/%d/%Y, %H:%M:%S")
    #             #timestampDate = datetime.strptime(timestampStr, "%m/%d/%Y, %H:%M:%S")
    #             packet = {'projectId': projectId, 'timestamp': t, 'type': fields[1],
    #                'nodeId': fields[2], 'data': fields[3]}
    #             self.packetList.append(packet)
    #             i+=1
    #             if i == 6:
    #                 break
        
    #     # semi Hardcoded for demos sake until discussed how we would rearrange threading 
    #     # dataGetter.receiveTraffic(projectId)
    #     dataSaver.storePackets(self.packetList)
    #     return

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
        
    @router.post("/projects/{projectId}/packets", tags=["packets"])
    def saveEditedPacket(projectId: str, packets: List[packet], replay: Union[bool, None] = None):
        packetList = []
        for packet in packets:
            timestampDate = datetime.strptime(packet.timestamp, '%Y-%m-%dT%H:%M:%S.%f')
            newPacket = {'projectId': projectId, 'timestamp': timestampDate, 'type': packet.type,
            'nodeId': packet.nodeId, 'data': packet.data}
            packetList.append(newPacket)
            if(replay):
                #sendpacket()
                ...

        return dataSaver.storePackets(packetList)


    @router.get("/projects/{projectId}/packets", tags=["packets"])
    def getPacketsFromProject(projectId: str, size: int, sort: str, page: int, node: Union[str, None] = None, before: Union[str, None] = None, after: Union[str, None] = None):
        return dataGetter.getPackets(projectId, size, sort, page, node, before, after)

    @router.put("/projects/{projectId}/play", tags=["play"])
    def getLivePackets(projectId: str, play: Play):
        i = 1
        while(play and i <= 50):
            dataGetter.receiveTraffic(projectId, dbc, bus)
            i += 1
        return 
