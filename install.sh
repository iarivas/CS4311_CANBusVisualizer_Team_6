#!/bin/bash

declare arguement1=$1;
declare installOption="install";
declare runOption="run";

function installer {
    pip --version;
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -;
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list;
    sudo apt-get update -y;
    sudo apt-install -y mongodb-org;
    echo "installing";
}
function runner {
    echo "running"
}
if [ $arguement1 = $installOption ] 
then 
    installer
elif [ $arguement1 = $runOption ]
then
    runner
fi
