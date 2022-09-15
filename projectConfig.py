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
    

    def __init__(self) -> None:
        pass


    def idGenerator(id):
        if id != None:
            project_id = id
        else:
            letters = string.ascii_lowercase
            project_id = ''.join(random.choice(letters) for i in range(10))
        