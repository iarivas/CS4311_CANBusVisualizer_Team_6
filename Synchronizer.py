class Synchronizer(object):
    def __init__(self, project):
        self._project = project
        self._isSynchronized = False

    ## Setters
    def setProj1(self, project): self._project = project

    ## Getters
    def getProj1(self): return self._proj1

    ## Functions
    # Synchronizes both projects
    def Synchronize(self, newProject):
        return

    # Checks if both projects are synchronized
    def isSynchronized(self):
        return self._isSynchronized