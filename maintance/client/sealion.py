import json

import requests


class DialogueDocumentAPI:
    def __init__(self, service_url):
        self.service_url = service_url
        self.headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'}

    def update(self, item):
        url = "{}/api/dialogue_documents/{}/".format(
            self.service_url,
            item["id"]
        )
        r = requests.put(url, headers=self.headers, data=json.dumps(item))

    def get_all(self):
        url = "{}/api/dialogue_documents/?limit=1000".format(self.service_url)
        headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'}
        r = requests.get(url, headers=headers).json()
        documents = r["results"]
        while r["next"]:
            url = r["next"]
            headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json'}
            r = requests.get(url, headers=headers).json()
            documents = documents + r["results"]
        return documents


class SeaLionClient:
    def __init__(self, url):
        self.service_url = url
        self.dialog_document = DialogueDocumentAPI(self.service_url)
