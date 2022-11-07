#!/bin/bash

declare arguement1=$1;
declare installOption="install";
declare runOption="run";

function installer {
    #install mongodb community edition.
    installMongoDbCommunity;
    #install mongodb compass
    installMongoDbCompass;
    #install python modules
    installPythonModules;
    #install NPM
    installNpm;

    echo "installing";
}
function installNpm {
    sudo apt-get install -y npm;
    cd Front-End/src && npm install;
    cd ../..;
}
function installPythonModules {
    python3 -m pip install fastapi;
    python3 -m pip install uvicorn[standard];
    python3 -m pip install pymongo;
    python3 -m pip install python-can;
    python3 -m pip install cantools;
}
function installMongoDbCompass {
    wget https://downloads.mongodb.com/compass/mongodb-compass_1.33.1_amd64.deb;
    sudo dpkg -i mongodb-compass_1.33.1_amd64.deb;
    rm mongodb-compass_1.33.1_amd64.deb;
}
function installMongoDbCommunity {
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -;
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list;
    sudo apt-get update -y;
    sudo apt-get install -y mongodb-org;
    sudo systemctl start mongod;
    sudo systemctl enable mongod;
}
function runner {
    echo "running";
    cd Back-End/src && python3 -m main && export BackendId=$!;
    cd ../..;
    cd Front-End/src && npm start && export frontEndId=$!;
}
function exit {
    kill frontEndId;
    kill BackendId;
    exit
}
trap exit SIGINT 
if [ $arguement1 = $installOption ] 
then 
    installer
elif [ $arguement1 = $runOption ]
then
    runner;
    while true;
    do
        echo "press CTRL-C to quit program";
        sleep 5;
    done
fi
