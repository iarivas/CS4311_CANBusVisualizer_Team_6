import sys
 
# setting path
sys.path.append('..')

from dataSaver import *

# change 1st variable if testing create project
# dataSaver.createInitialProject(2, 2, 3, 4, None, None)

dataSaver.update(1, 3, 5, 7, 9, 11)
