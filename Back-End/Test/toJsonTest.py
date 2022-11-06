from bson.json_util import dumps
from pymongo import MongoClient
import json
from os import path

if __name__ == '__main__':
    
    proj = "Test_11_5"

    client = MongoClient('localhost', 27017)
    
    db = client.TestDB
    project = []
    projCollection = db.TestCol
    projCursor = list(projCollection.find({'eventName': proj}))

    pdb = client.TestPDB
    nodes = []
    nodeCollection = pdb.TestColNodes
    nodeCursor = list(nodeCollection.find({'projectId': proj}))

    packets = []
    packetCollection = pdb.TestCol
    packetCursor = list(packetCollection.find({'projectId': proj}))

    json_project = dumps(projCursor, indent = 2) 
    json_nodes = dumps(nodeCursor, indent = 2) 
    json_packets = dumps(packetCursor, indent = 2) 

    file = '/home/cbvs/Desktop/CS4311_CANBusVisualizer_Team_6/Back-End/Projects/' + proj +'.json'
    print(file)

    with open(file, 'w') as file:
        file.write("{\n\"Project\": " + json_project + ",\n")
        file.write("\"Nodes\": " + json_nodes + ",\n")
        file.write("\"Packets\": " + json_packets + "}\n")