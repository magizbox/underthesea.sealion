import requests
import json
from os.path import join

from underthesea.feature_engineering.text import Text
from underthesea.util.file_io import write

SERVICE_API = "http://localhost:8001"


def export_documents():
    url = "{}/api/documents/?status=ANNOTATED&act=true&quality=&corpus=1&limit=50".format(SERVICE_API)
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


data = export_documents()
data = Text(json.dumps(data, ensure_ascii=False))
write(join("data", "posts_act_20171018.json"), data)
