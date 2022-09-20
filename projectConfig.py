'''
Last Updated 9/14/2022 by justus

Current state of project object class is
basic information and initializtion deffinition.
information currently is set to None by default,
but will change to values once test data is given
'''

from random import random
import string


class project():
    projectId = None
    analystInitials = None
    canConnectorId = None
    vehicleId = None
    baudRate = None
    eventName = None
    eventDate = None
    dbcFileName = None
    blackListFileName = None
    
    # initializes object
    def __init__(self, baudRate, analystInitials, eventName = None, dbcFileName = None, blackListFileName = None) -> None:
        self.baudRate = baudRate
        self.analystInitials = analystInitials
        self.eventName = eventName
        self.dbcFileName = dbcFileName
        self.blackListFileName = blackListFileName
        self.projectId = idGenerator(eventName)
        

    #if no custom id is given then a random id is generated
    def idGenerator(id): 
        if id != None:
            project_id = id
            return project_id
        else:
            letters = string.ascii_lowercase
            project_id = ''.join(random.choice(letters) for i in range(10))
            return project_id
        