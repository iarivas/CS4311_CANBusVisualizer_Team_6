from struct import pack
from typing import Union
from dataSaver import dataSaver
from fastapi import APIRouter
from packetManager import packetManager

packetM = packetManager()
router = APIRouter()

@router.get("/projects/{projectID}/packets", tags=["packets"])
def getPacketsFromProject(projectID: str, size: int, sort: str, node: Union[str, None] = None, before: Union[str, None] = None, after: Union[str, None] = None):
    packetM.populatePacketList(projectID)
    return dataSaver.getPackets(projectID, size, sort, node, before, after)