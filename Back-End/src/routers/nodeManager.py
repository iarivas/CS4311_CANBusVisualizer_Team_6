from typing import Any, List
from fastapi import APIRouter
from dataSaver import dataSaver
from dataGetter import dataGetter
from Node import Node

router = APIRouter()

class nodeManager:
    def __init__(self, nodeList: List[Node] = []):
        self.nodeList = nodeList

    # setter for the node list
    def setNodeList(self, nodeList):
        self._nodeList = nodeList

    # getter for the node list
    def getNodeList(self) -> List[Node]:
        return self._nodeList

    # functions
    def createNode(self, ID, name, position, annotation, relatedNodeID, color, icon, visitibility) -> Node:
        return Node(ID, name, position, annotation, relatedNodeID, color, icon, visitibility)

    # Not sure what field of the node is going to be updated here, will leave empty for now
    def updateNode(self):
        pass
        #TODO

    #This is hardcoded for testing purposes (Montse can't run this on her laptop so she needs this :)
    # def populateNodeList(self, projectId):
    #     nodes = [
    #         ['1234', None, 'some-name', None,[]],
    #         ['12345', None,'some-other-name', None,[]]
    #     ]

    #     for n in nodes:
    #         node = {'projectId': projectId, 'nodeId': n[0], 'data': n[1], 'name': n[2],
    #             'position': n[3], 'relationship': n[4]}
    #         self.nodeList.append(node)
        
    #     dataSaver.storeNodes(self.nodeList)


    def isNodeBlacklisted(self, node: Node) -> bool:
        pass
        # thinking something like this:
        # return blacklistManager.isNodeBlacklisted(node)
        #TODO

    def importNodes(self):
        pass
        #TODO

    def exportNodes(self):
        pass
        #TODO

    def searchForNode(self, nodeID) -> Node:
        for node in self._nodeList:
            if nodeID == Node._ID:
                return node

        return -1 # assuming no node will ever have an ID of -1

    @router.get("/projects/{projectId}/nodes", tags=["nodes"])
    def getNodesFromProject(projectId: str):
        nm = nodeManager() # harcoded stuff Montse needs to be able to test locally!
        nm.populateNodeList(projectId)
        return dataGetter.getNodes(projectId)

    @router.put("/projects/{projectId}/nodes", tags=["nodes"])
    def updateNodesList(projectId: str, nodeList: list):
        dataSaver.updateNodes(projectId, nodeList)
