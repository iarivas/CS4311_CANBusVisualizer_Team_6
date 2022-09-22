'''
Last Updated 9/19/2022 by montse
 
Will update project settings and state as more
information becomes available to us

Current state of project manager is barebones 
skeleton containing definitions but no logic.
Currently creates new project on createProject 
API endpoint call
'''
from urllib import response
import projectConfig
from fastapi import FastAPI, File, UploadFile, status
from pydantic import BaseModel
from dataSaver import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Project_Info(BaseModel):
    baud_rate: int
    initials: str
    name: str = None
    dbc_file: str = None
    blacklist_file: str = None

class projectManager():

    currentProject = None #Will create project object to store information off file
    projectState = None #temp file call
    
    def __init__(self) -> None:
        pass

    def openProject():
        return

    def archiveProject():
        return

    @app.post("/projects/", status_code=201)
    def createProject(project_info: Project_Info):
        if len(project_info.initials) == 0:
            response.status_code = status.HTTP_406_NOT_ACCEPTABLE
        currentProject = projectConfig.project(project_info.baud_rate, project_info.initials, project_info.name, project_info.dbc_file, project_info.blacklist_file)
        # createInitialPoject is the mongoDB saving definition from dataSaver.py 
        dataSaver.createInitialProject(currentProject.projectId, currentProject.baudRate, currentProject.analystInitials, currentProject.eventName, currentProject.dbcFileName, currentProject.blackListFileName)
        return currentProject
