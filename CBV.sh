#!/bin/bash

#variables...just variables
declare arguement1=$1;
declare installOption="install";
declare runOption="run";
declare backendId=$backendId;
declare frontEndId=$frontEndId;

function installer {
    #install mongodb dependencies.
    installMongoDependencies;
    #install mongodb community edition.
    installMongoDbCommunity;
    #install mongodb compass
    installMongoDbCompass;
    #install SSH Service for Rsync
    installSsh;
    #install python modules
    installPythonModules;
    #install NPM
    installNpm;
    echo "installing";
}
function installMongoDependencies {
    sudo apt-get install -y libgconf-2-4;
    sudo apt-get install -y libgconf2-4;
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
function installSsh {
    sudo apt install -y openssh-server;
    sudo service ssh start;
    sudo service ssh restart;
}
function runProgram {
    #start up mongo
    sudo systemctl start mongod;
    sudo systemctl enable mongod;
    #start up ssh
    sudo service ssh start;
    sudo service ssh restart;
    #setup vcan for testing.
    sudo modprobe vcan;
    sudo ip link add dev vcan0 type vcan;
    sudo ip link set up vcan0;
    #start Back-End
    cd Back-End/src && python3 -m main & 
    backendId=$!;
    #start Front-End
    cd Front-End/src && npm start & 
    frontEndId=$!;
}
function exit {
    #kill background processes and kill current script;
    kill -9 ${backendId};
    kill -9 ${frontEndId};
    kill $$;
    exit
    
}
trap exit SIGINT;

if [ $arguement1 = $installOption ] 
then 
    installer;
elif [ $arguement1 = $runOption ]
then
    #start runner
    runProgram;
    echo "press CTRL-C to quit program";
    #this is necessary, without this the script terminates and leaves background tasks.
    while true;
    do
        sleep 5;
    done
else
    echo "Command not found. Input either install or run"
fi
