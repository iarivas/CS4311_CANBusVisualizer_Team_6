#!/bin/bash

declare arguement1=$1;
declare installOption="install";
declare runOption="run";

function installer {
    pip --version;
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
