import subprocess
import os

def run_git(args):
    try:
        result = subprocess.run(['git'] + args, capture_output=True, text=True, cwd=r'c:\Users\ASUS\Downloads\Courses\Quiz-Website')
        return f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}\nRETURN CODE: {result.returncode}"
    except Exception as e:
        return str(e)

with open(r'c:\Users\ASUS\Downloads\Courses\Quiz-Website\git_diag.txt', 'w') as f:
    f.write("STATUS:\n")
    f.write(run_git(['status']))
    f.write("\n\nREMOTE:\n")
    f.write(run_git(['remote', '-v']))
    f.write("\n\nBRANCH:\n")
    f.write(run_git(['branch']))
