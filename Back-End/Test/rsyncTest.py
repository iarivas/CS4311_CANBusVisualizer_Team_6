import subprocess

subprocess.call(["sshpass","-p","kali","rsync","-av","--dry-run","../rctest/","kali@192.168.98.128:~/Desktop/rctesterfolder"])
