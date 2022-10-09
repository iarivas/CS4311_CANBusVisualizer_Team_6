class mapController(object):
    def __init__(self, B_renameNode, B_changeVisibility, B_addRelationship, B_removeRelationship):
        self._B_renameNode = B_renameNode
        self._B_changeVisibility = B_changeVisibility
        self._B_addRelationship = B_addRelationship
        self._B_removeRelationship = B_removeRelationship

    ## Setters
    def setRenameNodeButton(self, B_renameNode):                    
        self._B_renameNode = B_renameNode
    def setChangeVisibilityButton(self, B_changeVisibility):        
        self._B_changeVisibility = B_changeVisibility
    def setAddRElationshipButton(self, B_addRelationship):          
        self._B_addRelationship = B_addRelationship
    def setRemoveRelationshipButton(self, B_removeRelationship):    
        self._B_removeRelationship = B_removeRelationship

    ## Getters
    def getRenameNodeButton(self):          return self._B_renameNode
    def getChangeVisibilityButton(self):    return self._B_changeVisibility
    def getAddRElationshipButton(self):     return self._B_addRelationship
    def getRemoveRelationshipButton(self):  return self._B_removeRelationship

    ## Functions
    # Passes selected node to nodeManager and opens renameNode menu
    def isNodeVisible(self, node):
        return

    # Passes selected node to nodeManager
    def isNodeVisible(self, node):
        return

    # Passes selected nodes to nodeManager
    def addNodeRelationship(self, node1, node2):
        return

    # Passes selected nodes to nodeManager
    def removeNodeRelationship(self, node1, node2):
        return