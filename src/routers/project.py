import projectConfig
from fastapi import status, HTTPException, APIRouter
from dataSaver import *
from pydantic import BaseModel
from projectManager import projectManager

projectM = projectManager()
router = APIRouter()

class ProjectInfo(BaseModel):
    baudRate: int
    initials: str
    eventName: str
    dbcFile: str = None
    blacklistFile: str = None


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
    projectM.currentProject = projectConfig.project(projectInfo.baudRate, projectInfo.initials, projectInfo.eventName, projectInfo.dbcFile, projectInfo.blacklistFile)
    # createInitialPoject is the mongoDB saving definition from dataSaver.py 
    dataSaver.createInitialProject(projectM.currentProject.projectId, projectM.currentProject.baudRate, projectM.currentProject.analystInitials, projectM.currentProject.eventName, projectM.currentProject.dbcFileName, projectM.currentProject.blackListFileName)
    return projectM.currentProject
