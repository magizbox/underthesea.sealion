import json

import requests
from underthesea.feature_engineering.text import Text
from underthesea.util.file_io import write




class DialogueDocumentExport:
    def __init__(self, service_api, data_file):
        self.service_api = service_api
        self.data_file = data_file

    def export(self):
        url = "{}/api/dialogue_documents/?act=true".format(self.service_api)
        headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
        r = requests.get(url, headers=headers).json()
        items = r["results"]
        while r["next"]:
            url = r["next"]
            headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json'}
            r = requests.get(url, headers=headers).json()
            items = items + r["results"]
        print("Export {} items to {}".format(len(items), self.data_file))
        data = Text(json.dumps(items, ensure_ascii=False))
        write(self.data_file, data)
