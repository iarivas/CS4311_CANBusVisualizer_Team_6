from dataGetter import dataGetter
import subprocess
import time
from pathlib import Path
import glob
import os
import signal


class Synchronizer(object):
    def __init__(self):
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

    def syncSelectedProject(self, eventName, type, userName, IP, Pass):
        # creates a Json file of the current project
        dataGetter.exportSelectedProject(eventName, type)

        
        recieverAddress = userName+"@"+IP+":~/Desktop/CS4311_CANBusVisualizer_Team_6/Back-End/Projects/"
        subprocess.call(["sshpass","-p",Pass,"rsync","-av", "../Projects/",recieverAddress])

        [f.unlink() for f in Path("../Projects").glob("*") if f.is_file()]         
        return

    # def handler(signum, frame):
    #     print("Timed Out")
    #     raise Exception("Timed Out")