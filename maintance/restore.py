import time
from os.path import join, dirname

from restore.dialogue_corpora import Restore

if __name__ == '__main__':
    # Restore dialogue corpora
    data_file = join(dirname(__file__), "data", "dialogue_corpora_20171027.json")
    service_api = "http://localhost:8001"
    start = time.time()
    r = Restore(service_api, data_file)
    r.restore()
    end = time.time()
    print("{:.2f} seconds".format(end - start))
