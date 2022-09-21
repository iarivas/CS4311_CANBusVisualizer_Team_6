class Node:
    def __init__(self, ID, name, position, annotation, relatedNodeID, color, icon, visitibility):
        self._ID = ID
        self._name = name
        self._position = position
        self._annotation = annotation
        self._relatedNodeID = relatedNodeID
        self._color = color
        self._icon = icon
        self._visitibility = visitibility

    # Getters
    def getID(self):
        return self._ID

    def getName(self):
        return self._name

    def getPosition(self):
        return self._position

    def getAnnotation(self):
        return self._annotation

    def getRelatedNodeID(self):
        return self._relatedNodeID

    def getColor(self):
        return self._color
    
    def getIcon(self):
        return self._icon

    def getVisitibility(self):
        return self._visitibility

    # Setters
    def setID(self, id):
        self._id = id

    def setName(self, name):
        self._name = name

    def setPosition(self, position):
        self._position = position

    def setAnnotation(self, annotation):
        self._annotation = annotation
    
    def setRelatedNodeID(self, relatedNodeID):
        self._relatedNodeID = relatedNodeID

    def setColor(self, color):
        self._color = color

    def setIcon(self, icon):
        self._icon = icon

    def setVisibility(self, visibility):
        self._visitibility = visibility