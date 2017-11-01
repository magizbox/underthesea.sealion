import json

import requests
from underthesea.feature_engineering.text import Text
from underthesea.util.file_io import write
from urllib.parse import urlencode


class DialogueDocumentExport:
    def __init__(self, service_api):
        self.service_api = service_api

    def export(self, params, file):
        url = "{}/api/dialogue_documents/?{}".format(self.service_api,
                                                     urlencode(params))
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
        print("Export {} items to {}".format(len(items), file))
        data = Text(json.dumps(items, ensure_ascii=False))
        write(file, data)
