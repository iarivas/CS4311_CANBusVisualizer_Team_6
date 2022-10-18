'''
Last Updated 10/92/2022 by Montse
 
Will update project settings and state as more
information becomes available to us

Current state of project manager is barebones 
skeleton containing definitions but no logic.
Currently creates new project on createProject 
API endpoint call
'''
import projectConfig
from fastapi import status, HTTPException, APIRouter
from dataSaver import *
from pydantic import BaseModel
from Node import Node

router = APIRouter()

class ProjectInfo(BaseModel):
    baudRate: int
    initials: str
    eventName: str
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

    @router.post("/projects/", tags=["project"])
    def createProject(projectInfo: ProjectInfo):
        if len(projectInfo.initials) == 0:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Analyst initials were not provided"
            )
        if projectInfo.baudRate is None:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Baud rate was not provided"
            )
        if len(projectInfo.eventName) == 0:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Project name was not provided"
            )
        currentProject = projectConfig.project(projectInfo.baudRate, projectInfo.initials, projectInfo.eventName, projectInfo.dbcFile, projectInfo.blacklistFile)
        # createInitialPoject is the mongoDB saving definition from dataSaver.py 
        dataSaver.createInitialProject(currentProject.projectId,
                                    currentProject.baudRate,
                                    currentProject.analystInitials,
                                    currentProject.eventName,
                                    currentProject.dbcFileName,
                                    currentProject.blackListFileName)
        return currentProject