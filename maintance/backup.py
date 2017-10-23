import requests
import json
from os.path import join

from underthesea.feature_engineering.text import Text
from underthesea.util.file_io import write


def get_corpora():
    url = "http://localhost:8000/api/corpora/?limit=50"
    headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'}
    r = requests.get(url, headers=headers).json()
    data = r["results"]
    while r["next"]:
        url = r["next"]
        headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'}
        r = requests.get(url, headers=headers).json()
        data = data + r["results"]
    return data


def get_documents():
    url = "http://localhost:8000/api/documents/?limit=50"
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


def get_data():
    documents = get_documents()
    corpora = get_corpora()
    data = {"documents": documents, "corpora": corpora}
    output = Text(json.dumps(data, ensure_ascii=False))
    return output


documents = get_documents()
corpora = get_corpora()
data = get_data()
write(join("data", "20171023.json"), data)
