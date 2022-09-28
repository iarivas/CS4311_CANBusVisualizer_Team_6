import sys
 
# setting path
sys.path.append('../src')

from dataReceiver import *

# dataReceiver.retrieveProject(2)

# dataReceiver.retrieveBaudRate("Project 1")
# dataReceiver.retrieveBlacklistFile("Project 2")
# dataReceiver.retrieveName("TestingLocal")
# dataReceiver.retrieveDBCFile("TestingLocal")
# dataReceiver.retrieveInitials("Project 2")
# dataReceiver.retrieveProjects("Project 2")
# dataReceiver.retrievePackets("Project 1")

archived = dataReceiver.retrieveArchivedProjects()
print("Archived Projects: ", archived)

projects = dataReceiver.retrieveAllProjects()
print("All projects in database: ", projects)