import json

from backup.dialogue_corpora import get_documents
from client.sealion import SeaLionClient
from client.underthesea import UnderTheSeaClient

sc = SeaLionClient("http://localhost:8000")
dd = sc.dialog_document
dialog_documents = dd.get_all()

for document in dialog_documents:
    print(document["id"])
    text = document["text"]
    uc = UnderTheSeaClient("http://localhost:9001")
    acts = uc.identify_dialog_act(text)
    acts = [{"name": name} for name in acts]
    document["auto_act"] = json.dumps(acts, ensure_ascii=False)
    dd.update(document)
