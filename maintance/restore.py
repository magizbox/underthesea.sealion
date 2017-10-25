import requests
import json
from os.path import join

SERVER_API = "http://localhost:8001"
file = "20171025.json"


def restore():
    content = open(join("data", file), "r").read()
    data = json.loads(content)
    restore_corpus(data)


def restore_document(data, map_corpus):
    documents = data["documents"]
    for document in documents:
        print("Restore document", document["id"])
        document["corpus"] = map_corpus[document["corpus"]]
        headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'}
        url = "{}/api/documents/".format(SERVER_API)
        r = requests.post(url, data=json.dumps(document), headers=headers)


def restore_corpus(data):
    corpora = data["corpora"]
    map_corpus = {}
    for corpus in corpora:
        headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'}
        url = "{}/api/corpora/".format(SERVER_API)
        r = requests.post(url, data=json.dumps(corpus), headers=headers)
        corpus_id = r.json()["id"]
        map_corpus[corpus["id"]] = corpus_id
    restore_document(data, map_corpus)


if __name__ == '__main__':
    restore()
