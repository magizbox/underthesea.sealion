import requests
import json
import time
from underthesea.util.file_io import read

headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'}


class Restore:
    def __init__(self, service_api, data_file):
        self.service_api = service_api
        content = read(data_file)
        self.data = json.loads(content)
        self.corpus_ids = {}
        self.dialogue_ids = {}
        self.document_ids = {}
        self.dialogues = []

    def restore(self):
        self.restore_corpora()
        self.restore_dialogues()
        self.restore_documents()
        self.update_dialogues_content()

    def restore_documents(self):
        documents = self.data["documents"]
        for i, document in enumerate(documents):
            documents[i]["dialogue"] = self.dialogue_ids[document["dialogue"]]
        print("Restore {} documents".format(len(documents)))
        url = "{}/api/dialogue_documents/".format(self.service_api)
        # r = requests.post(url, data=json.dumps(documents), headers=headers)
        start = time.time()
        for i, document in enumerate(documents):
            r = requests.post(url, data=json.dumps(document), headers=headers)
            id = r.json()["id"]
            self.document_ids[document["id"]] = id
            if (i % 200 == 0 and i > 0) or i == len(documents) - 1:
                end = time.time()
                print("Restore {} documents in {:.2f} seconds.".format(i, end - start))


    def map_documents_id(self, ids):
        if isinstance(ids, list):
            return [self.map_documents_id(id) for id in ids]
        return self.document_ids[ids]

    def update_content(self, content):
        ids = json.loads(content)
        output = json.dumps(self.map_documents_id(ids))
        return output

    def update_dialogues_content(self):
        for dialogue in self.dialogues:
            dialogue["content"] = self.update_content(dialogue["content"])
            url = "{}/api/dialogues/{}/".format(self.service_api, dialogue["id"])
            r = requests.put(url, data  =json.dumps(dialogue), headers=headers)

    def restore_dialogues(self):
        dialogues = self.data["dialogues"]
        for i, dialogue in enumerate(dialogues):
            dialogues[i]["corpus"] = self.corpus_ids[dialogue["corpus"]]
        print("Restore {} dialogues".format(len(dialogues)))
        url = "{}/api/dialogues/".format(self.service_api)
        r = requests.post(url, data=json.dumps(dialogues), headers=headers)
        new_dialogues = r.json()
        ids = [item["id"] for item in dialogues]
        new_ids = [item["id"] for item in new_dialogues]
        self.dialogue_ids = dict(zip(ids, new_ids))
        self.dialogues = new_dialogues

    def restore_corpora(self):
        corpora = self.data["corpora"]
        for corpus in corpora:
            url = "{}/api/dialogue_corpora/".format(self.service_api)
            r = requests.post(url, data=json.dumps(corpus), headers=headers)
            self.corpus_ids[corpus["id"]] = r.json()["id"]


if __name__ == '__main__':
    data_file = "test.json"
    service_api = "http://localhost:8001"
    start = time.time()
    r = Restore(service_api, data_file)
    r.restore()
    end = time.time()
    print("{:.2f} seconds".format(end - start))
