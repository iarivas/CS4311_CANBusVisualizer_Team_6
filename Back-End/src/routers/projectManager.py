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
from dataGetter import *
from pydantic import BaseModel
#from socket import *
from typing import Union

router = APIRouter()


class ProjectInfo(BaseModel):
    baudRate: int = None
    initials: str = None
    eventName: str = None
    dbcFile: str = None
    blacklistFile: str = None
    archieve: bool = None


class projectManager():

    currentProject = None  # Will create project object to store information off file
    projectState = None  # temp file call

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
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Analyst initials were not provided"
            )
        if projectInfo.baudRate is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Baud rate was not provided"
            )
        if len(projectInfo.eventName) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Project name was not provided"
            )
        currentProject = projectConfig.project(
            projectInfo.baudRate, projectInfo.initials, projectInfo.eventName, projectInfo.dbcFile, projectInfo.blacklistFile)
        # createInitialPoject is the mongoDB saving definition from dataSaver.py
        dataSaver.createInitialProject(currentProject.projectId,
                                       currentProject.baudRate,
                                       currentProject.analystInitials,
                                       currentProject.eventName,
                                       currentProject.dbcFileName,
                                       currentProject.blackListFileName)
        return currentProject

    @router.get("/projects/", tags=["project"])
    def getProjects(isArchived: Union[bool, None] = None):
        return dataGetter.getAllProjects(isArchived)
        
    @router.get("/projects/{projectId}", tags=["project"])
    def getSingleProject(projectId: str):
        return dataGetter.retrieveSingleProject(projectId)
        


    # TODO Christian
    @router.put("/projects/{projectId}/", tags=["project"])
    def setProjectData(projectId: str, projectInfo: ProjectInfo):
        dataSaver.updateIndivial(projectId, projectInfo.baudRate, projectInfo.initials,
                                 projectInfo.eventName, projectInfo.dbcFile, projectInfo.blacklistFile, projectInfo.archieve)

    #@router.post("/projects/{projectId}/Export", tags=["Export"])
    def exportProject(projectInfo: ProjectInfo):
        return dataGetter.exportCurrentProject(projectInfo.eventName, 'json')

    # TODO FOR JUSTUS (thx!)
    # @router.post("/projects/", tags=["project"])
    # def sync():
    #     s = socket(AF_INET, SOCK_STREAM)
    #     s.bind(("localhost", 7069))
    #     s.listen(5)

    #     while True:
    #         c,a = s.accept()
