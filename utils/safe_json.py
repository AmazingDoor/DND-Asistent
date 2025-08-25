import json
import os
import tempfile
from filelock import FileLock, Timeout

def safe_read_json(file_path):
    lock = FileLock(file_path + '.lock')
    with lock:
        with open(file_path, 'r') as f:
            return json.load(f)

def safe_write_json(data, file_path):
    lock = FileLock(file_path + '.lock')
    with lock:
        # Write to a temp file first
        dir_name = os.path.dirname(file_path)
        with tempfile.NamedTemporaryFile('w', dir=dir_name, delete=False) as tmp_file:
            json.dump(data, tmp_file, indent=4)
            tmp_path = tmp_file.name
        os.replace(tmp_path, file_path)  # Atomic replace