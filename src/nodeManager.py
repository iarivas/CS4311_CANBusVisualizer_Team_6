from tkinter.messagebox import NO
from typing import List
from Node import Node

class nodeManager:
    def __init__(self, nodeList: List[Node] = []):
        self._nodeList = nodeList

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