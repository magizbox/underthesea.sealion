import json
from underthesea.classification.bank import classify
from client.sealion import SeaLionClient
from client.underthesea import UnderTheSeaClient

sc = SeaLionClient("http://localhost:8001")
dd = sc.dialog_document
dialog_documents = dd.get_all()

for document in dialog_documents:
    print(document["id"])
    text = document["text"]
    uc = UnderTheSeaClient("http://localhost:9001")

    # auto act
    # acts = uc.identify_dialog_act(text)
    # acts = [{"name": name} for name in acts]
    # document["auto_act"] = json.dumps(acts, ensure_ascii=False)

    # auto category
    categories = classify(text)
    categories = [{"name": name} for name in categories]
    document["auto_category"] = json.dumps(categories, ensure_ascii=False)
    dd.update(document)
