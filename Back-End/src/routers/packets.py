from struct import pack
from typing import Union
from dataReceiver import dataReceiver
from fastapi import APIRouter
from packetManager import packetManager
from dataSaver import dataSaver
from pydantic import BaseModel

packetM = packetManager()
router = APIRouter()


class Play(BaseModel):
    play: bool

@router.get("/projects/{projectId}/packets", tags=["packets"])
def getPacketsFromProject(projectId: str, size: int, sort: str, node: Union[str, None] = None,
 before: Union[str, None] = None, after: Union[str, None] = None):
    packetM.populatePacketList(projectId)
    return dataSaver.getPackets(projectId, size, sort, node, before, after)

@router.put("/projects/{projectId}/play", tags=["play"])
def packetsOn(projectId: str, play: Play):
    while(play):
        print("play: ", play)
        dataReceiver.receiveTraffic(projectId)
    return