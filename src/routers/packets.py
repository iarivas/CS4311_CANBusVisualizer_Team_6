from struct import pack
from typing import Union
from dataSaver import dataSaver
from fastapi import APIRouter
from packetManager import packetManager

packetM = packetManager()
router = APIRouter()

@router.get("/projects/{projectId}/packets", tags=["packets"])
def getPacketsFromProject(projectId: str, size: int, sort: str, node: Union[str, None] = None, before: Union[str, None] = None, after: Union[str, None] = None):
    packetM.populatePacketList(projectId)
    return dataSaver.getPackets(projectId, size, sort, node, before, after)