# Can Bus Visualizer - Backend API

The Can Bus visualizer is a WebBased Application Service that allows military analists service, diagnose, and record vehical data.

The Backend API that this repository contains will allow the front end service to interact with system critical features as well as system data though an json based interface

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You are using a html supported internet browser
* You are useing the front end service to access the backend api
* You have access to a command or powershell terminal `(soon will not be required)`
* you have acces to the internet `(Soon will not be required)`
* Have fastAPI installed `(Soon will not be required)`
* Have uvicorn installed `(Soon will not be required)`
* Have pymongo installed `(Soon will not be required)`

# Accessing The Backend API

## To start The Backend API server without application launcher, follow these steps:
>1. Open command terminal
>2. Navigate to src directory in project directory
>3. Run comand `uvicorn projectManager:app --reload`

## How to access the Backend API:
>The Backend API is only acesable through api calls useing the
FastAPI Framework. The server expects json format information and will reply in json format information. For exact calls reference list of features down below.


# List OF Features BackEnd Api Provides

## Create Project
>The createProject feature will allow  2- 5 parameters to create a new project. 
>The first two parameters are `required` and will include:
>1. Baud Rate
>2. Analyst Initials
>
>The remaining three parameters are `optional` to create a project with more starting information
>1. Project name
>2. DBC File
>3. Blacklist File
>
>The `minimal` expected json response  will look like the folloing:
```
{
  "baud_rate": 0,
  "initials": "string",
}
```
>The `Maximum` expected json response will look like the following:
```
{
  "baud_rate": 0,
  "initials": "string",
  "name": "string",
  "dbc_file": "string",
  "blacklist_file": "string"
}
```
>After the api call is made to create project the project will auto save to the MongoDB database. If no project name is given then a random string of length 10 will generate and take the place of the project name.






# Contributors and Contact Info
Thanks to the following people who have contributed to this project:
* [@Jfrausto10](https://github.com/jfrausto10) 
* [@mgmolina3](https://github.com/mgmolina3) 
* [@christiancordova107](https://github.com/christiancordova107) 
* [@LazyLinoone](https://github.com/LazyLinoone) 
* [@alanperezse](https://github.com/alanperezse) 
* [@ianrigsbee54](https://github.com/ianrigsbee54)
* [@diana-areisy](https://github.com/diana-areisy)
* [@garciagitmauricio](https://github.com/garciagitmauricio)
* [@iarivas](https://github.com/iarivas)

## Contact
If you want to contact me you can reach me at <dgtrinh@miners.utep.edu>.