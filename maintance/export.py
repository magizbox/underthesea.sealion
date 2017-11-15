from os.path import join, dirname

from export.dialogue_document import DialogueDocumentExport

if __name__ == '__main__':
    service_api = "http://localhost:8000"
    data_folder = join(dirname(__file__), "data")
    exporter = DialogueDocumentExport(service_api)
    exporter.export({"act": "true"}, join(data_folder, "acts_20171114.json"))
    # exporter.export({"category": "true"},
    #                 join(data_folder, "categories_20171101.json"))
