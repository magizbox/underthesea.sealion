from os.path import join, dirname
import json
from underthesea.util.file_io import write, read
from client.sealion import SeaLionClient
from export.dialogue_document import DialogueDocumentExport
from itertools import groupby


def by_url(item):
    return json.loads(item["meta"])["url"]


def update_dict(dict_1, dict_2, exclude_keys=None):
    keys = [key for key in dict_2 if key not in exclude_keys]
    for key in keys:
        dict_1[key] = dict_2[key]
    return dict_1


def sync_documents(documents):
    documents.sort(key=lambda item: item["created"])
    for i in range(1, len(documents)):
        documents[i] = update_dict(documents[i], documents[0], exclude_keys=["id", "created", "dialogue"])
        print(documents[i]["id"])
        client.dialog_document.update(documents[i])


if __name__ == '__main__':
    service_api = "http://localhost:8000"
    global client
    client = SeaLionClient(service_api)
    documents = client.dialog_document.get_all()
    content = json.dumps(documents, ensure_ascii=False)
    write("data.json", content)

    content = read("data.json")
    documents = json.loads(content)
    documents.sort(key=by_url)
    groups = [list(value) for key, value in groupby(documents, by_url)]
    groups = [item for item in groups if len(item) > 1]
    for documents in groups:
        sync_documents(documents)

