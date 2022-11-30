import subprocess

subprocess.call(["sshpass","-p","kali","rsync","-av","../Projects/","kali@192.168.98.132:~/Desktop/CS4311_CANBusVisualizer_Team_6/Back-End/Projects/"])

