import json
import requests
from underthesea.feature_engineering.text import Text
from underthesea.util.file_io import write


def get_corpora(service_url):
    url = "{}/api/dialogue_corpora/?limit=1000".format(service_url)
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
    url = "{}/api/dialogue_documents/?limit=1000".format(service_url)
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


def get_dialogues(service_url):
    url = "{}/api/dialogues/?limit=1000".format(service_url)
    headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'}
    r = requests.get(url, headers=headers).json()
    items = r["results"]
    while r["next"]:
        url = r["next"]
        headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'}
        r = requests.get(url, headers=headers).json()
        items = items + r["results"]
    return items


def backup_dialogue_corpora(service_url, file):
    documents = get_documents(service_url)
    corpora = get_corpora(service_url)
    dialogues = get_dialogues(service_url)
    data = {
        "documents": documents,
        "dialogues": dialogues,
        "corpora": corpora
    }
    print("Backup {} documents, {} dialogues, {} corpora".format(
        len(documents), len(dialogues), len(corpora)
    ))
    output = Text(json.dumps(data, ensure_ascii=False))
    write(file, output)


if __name__ == '__main__':
    service_url = "http://sealion:61111"
    file = "test.json"
    backup_dialogue_corpora(service_url, file)
