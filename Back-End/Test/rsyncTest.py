import subprocess

subprocess.call(["sshpass","-p","kali","rsync","-av","../Projects/","kali@192.168.98.128:~/Desktop/CS4311_CANBusVisualizer_Team_6/Back-End/Projects/"])
#subprocess.call(["sshpass","-p","1234","rsync","-av","../Projects/test.json","montserrat@172.20.16.40:~/Desktop/CS4311_CANBusVisualizer_Team_6/Back-End/Projects/"])

