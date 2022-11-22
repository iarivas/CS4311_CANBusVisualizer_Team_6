import csv
from pymongo import MongoClient

def export(proj):

    #proj = "Test_11_8"

    client = MongoClient('localhost', 27017)

    db = client.TestDB
    projCollection = db.TestCol
    projCursor = list(projCollection.find({'eventName': proj}))

    pdb = client.TestPDB
    nodeCollection = pdb.TestColNodes
    nodeCursor = list(nodeCollection.find({'projectId': proj}))

    packetCollection = pdb.TestCol
    packetCursor = list(packetCollection.find({'projectId': proj}))


    with open('../Projects/' + proj + '.csv', 'w') as f:

        w = csv.DictWriter(f, ['Project'])
        w.writeheader()
        w = csv.DictWriter(f, projCursor[0].keys())
        w.writeheader()
        for i in projCursor:
            w = csv.DictWriter(f, i.keys())
            w.writerow(i)  
        
        w = csv.DictWriter(f, ['Nodes'])
        w.writeheader()
        w = csv.DictWriter(f, nodeCursor[0].keys())
        w.writeheader()
        for i in nodeCursor:
            w = csv.DictWriter(f, i.keys())
            w.writerow(i) 
        
        w = csv.DictWriter(f, ['Packets'])
        w.writeheader()
        w = csv.DictWriter(f, packetCursor[0].keys())
        w.writeheader()
        for i in packetCursor:
            w = csv.DictWriter(f, i.keys())
            w.writerow(i) 