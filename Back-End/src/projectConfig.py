'''
Last Updated 10/02/2022 by Montse

Current state of project object class is
basic information and initializtion deffinition.
information currently is set to None by default,
but will change to values once test data is given
'''

import random
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
    nodeList: dict()
    
    # initializes object
    def __init__(self, baudRate, analystInitials, eventName = None, dbcFileName = None, blackListFileName = None) -> None:
        self.projectId = self.idGenerator()
        self.baudRate = baudRate
        self.analystInitials = analystInitials
        self.eventName = eventName
        self.dbcFileName = dbcFileName
        self.blackListFileName = blackListFileName
        

    #if no custom id is given then a random id is generated
    def idGenerator(self, id=None): 
        if id != None:
            project_id = id
            return project_id
        else:
            project_id = ''.join(random.choice(string.ascii_lowercase) for i in range(10))
            return project_id
        