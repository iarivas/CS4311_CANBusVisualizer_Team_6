import dataGetter as dataGetter
import subprocess

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

    def syncSelectedProject(self, eventName, eventName2, type, Un, Ip, Pw):
        # creates a Json file of the current project
        dataGetter.exportSelectedProject(eventName, type)

        recieverAddress = Un+"@"+Ip+":~/Desktop/CS4311_CANBusVisualizer_Team_6/Back-End/Projects/"
        subprocess.call(["sshpass","-p",Pw,"rsync","-av","--dry-run","/Projects/",recieverAddress])

        
        # Merges eventName2 file in /Back-End/Projects
        #dataGetter.mergeSelectedProject(eventName, eventName2, type)
        
        return