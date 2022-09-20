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

app = FastAPI()

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

    #def createProject():
        #currentProject = projectConfig.project()

    def openProject():
        return

    def archiveProject():
        return

    @app.post("/create_project/")
    def createProject(project_info: Project_Info):
        currentProject = projectConfig.project(project_info.baud_rate, project_info.initials, project_info.name, project_info.dbc_file, project_info.blacklist_file)
        # TODO: use db to save the newly created project
        return currentProject