from os import listdir
from os.path import isfile, join
import subprocess
mypath="dataset_raw/"
result_path="dataset/"
files = [f for f in listdir(mypath) if isfile(join(mypath, f))]
print(files)

for file in files:
    subprocess.run(["D:\Programy\Python36\python.exe", "main.py", "detect", f"--input={mypath}{file}", f"--output={result_path}{file}"])