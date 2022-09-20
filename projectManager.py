'''
Last Updated 9/19/2022 by montse
 
Will update project settings and state as more
information becomes available to us

Current state of project manager is barebones 
skeleton containing definitions but no logic.
Currently creates new project on createProject 
API endpoint call
'''
import projectConfig
from fastapi import FastAPI
from pydantic import BaseModel
from dataSaver import createInitialProject

app = FastAPI()

class Project_Info(BaseModel):
    baudRate: int
    Initials: str
    Name: str = None
    dbcFile: str = None
    blacklistFile: str = None

class projectManager():

    currentProject = None #Will create project object to store information off file
    projectState = None #temp file call
    
    def __init__(self) -> None:
        pass

    def openProject():
        return

    def archiveProject():
        return

    @app.post("/projects/")
    def createProject(project_info: Project_Info):
        currentProject = projectConfig.project(project_info.baudRate, project_info.Initials, project_info.Name, project_info.dbcFile, project_info.blacklistFile)
        # createInitialPoject is the mongoDB saving definition from dataSaver.py 
        createInitialProject(currentProject.projectId, currentProject.baudRate, currentProject.analystInitials, currentProject.eventName, currentProject.dbcFileName, currentProject.blackListFileName)
        return currentProject