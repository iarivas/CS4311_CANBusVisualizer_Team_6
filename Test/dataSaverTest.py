import sys
 
# setting path
sys.path.append('../src')

from dataSaver import *

# change 1st variable if testing create project
dataSaver.createInitialProject(2, 2, 3, 4, None, None)

dataSaver.update(2, 3, 5, 8, 9, 11, None, True)
