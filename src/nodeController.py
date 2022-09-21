from mapController import mapController

class nodeController(mapController):
    def __init__(self, 
                B_renameNode, 
                B_changeVisibility, 
                B_addRelationship, 
                B_removeRelationship,
                B_setIcon,
                B_coloPicker):
        super().__init__(B_renameNode, B_changeVisibility, B_addRelationship, B_removeRelationship)
        self._B_setIcon = B_setIcon
        self._B_colorPicker = B_coloPicker

    ## Functions
    #Passes selected node to nodeManager and opens iconPicker display
    def setIconButton(self):
        return

    #Passes selected node to nodeManager and opens colorPicker display
    def colorPickerButton(self):
        return

