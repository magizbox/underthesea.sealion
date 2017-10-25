import requests
import json
from underthesea.feature_engineering.text import Text
from underthesea.util.file_io import write


def get_corpora(service_url):
    url = "{}/api/corpora/?limit=50".format(service_url)
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


def get_documents(service_url):
    url = "{}/api/documents/?limit=50".format(service_url)
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


def backup_corpora(service_url, file):
    documents = get_documents(service_url)
    corpora = get_corpora(service_url)
    data = {"documents": documents, "corpora": corpora}
    output = Text(json.dumps(data, ensure_ascii=False))
    write(file, output)
