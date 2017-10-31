from os.path import join, dirname

from export.dialogue_document import DialogueDocumentExport

if __name__ == '__main__':
    data_file = join(dirname(__file__), "data", "acts_20171031.json")
    service_api = "http://localhost:8000"
    exporter = DialogueDocumentExport(service_api, data_file)
    exporter.export()
