from bson.json_util import dumps
from pymongo import MongoClient
import json
import os

def export(proj):

    #proj = "Test_11_5"

    client = MongoClient('localhost', 27017)
    
    db = client.TestDB
    projCollection = db.TestCol
    projCursor = list(projCollection.find({'eventName': proj}))

    pdb = client.TestPDB
    nodeCollection = pdb.TestColNodes
    nodeCursor = list(nodeCollection.find({'projectId': proj}))

    packetCollection = pdb.TestCol
    packetCursor = list(packetCollection.find({'projectId': proj}))

    json_project = dumps(projCursor, indent = 2) 
    json_nodes = dumps(nodeCursor, indent = 2) 
    json_packets = dumps(packetCursor, indent = 2) 

    file = '../Projects/' + proj +'.json'
    print(file)

    with open(file, 'w') as file:
        file.write("{\n\"Project\": " + json_project + ",\n")
        file.write("\"Nodes\": " + json_nodes + ",\n")
        file.write("\"Packets\": " + json_packets + "}\n")