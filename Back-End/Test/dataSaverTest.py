import sys
 
# setting path
sys.path.append('../src')

from dataSaver import *

# change 1st variable if testing create project

# dataSaver.createInitialProject(2, 2, 3, 4, None, None)

# dataSaver.update(2, 3, 5, 8, 9, 11, None, True)

# # USE TO TEST SAVING LOTS OF PACKETS TO DB
# list = []
# for i in range(1000):
#     doc = {
#         "projectID": "test",
#         "packetNum": i,
#         "packet": "packetStuff"
#     }
#     list.append(doc)

# dataSaver.storePackets(test, list)

# # USE TO TEST MASS DELETING PACKETS
# myquery = {"projectID": "test"}

# dataSaver.deleteAllPackets(myquery)