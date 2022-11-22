import toCSV as toCSV
import toJsonTest as toJsonTest
import mergeCSVToDB as mergeCSVToDB
import mergeJsonToDB as mergeJsonToDB
import sync as sync

def main():
    val = input("Would YOu like to:\n\t Import(1)\n\t Export(2)\n\t Sync(3)\n ")

    if(val == '1'):
        EventName1 = input("Please Enter the Project you would like to Import.")
        type = input("Please Enter the file type you would like to Import.")
        if (type == "json"):
            mergeJsonToDB.Import(EventName1)
        elif (type == "csv"):
            mergeCSVToDB.Import(EventName1)
        print("Imported")
    elif(val == '2'):
        EventName1= input("Please Enter the Project you would like to Export.")
        type = input("Please Enter the file type you would like to Import.")
        if (type == "json"):
            toJsonTest.export(EventName1)
        elif (type == "csv"):
            toCSV.export(EventName1)
        print("Exported")
    elif(val == '3'):
        EventName1= input("Please Enter the Project you would like to Sync.")
        EventName2= input("\nPlease Enter the Project you would like to Sync with.")
        type = input("Please Enter the file type you would like to Import.")
        sync.mergeSelectedProject(EventName1, EventName2, type)
        print("Synchronized")
    else: 
        print("Error")

if __name__ == "__main__":
    main()