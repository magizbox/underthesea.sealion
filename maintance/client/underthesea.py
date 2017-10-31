import json
import requests


class UnderTheSeaClient:
    def __init__(self, url):
        self.service_url = url

    def identify_dialog_act(self, text):
        url = "{}/act".format(self.service_url)
        headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'}
        content = {
            "text": text
        }
        r = requests.post(url, data=json.dumps(content), headers=headers)
        output = r.json()["output"]
        return output
