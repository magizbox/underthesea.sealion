from os.path import join, dirname
from maintance.backup.corpora import backup_corpora
from maintance.backup.dialogue_corpora import backup_dialogue_corpora

if __name__ == '__main__':
    # file = join(dirname(__file__), "data", "corpora_20171025.json")
    # service_url = "http://localhost:8000"
    # backup_corpora(service_url, file)

    file = join(dirname(__file__), "data", "dialogue_corpora_20171027.json")
    service_url = "http://localhost:8001"
    backup_dialogue_corpora(service_url, file)
