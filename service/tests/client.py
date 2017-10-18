import requests


class APIClient:
    def __init__(self, service_api="http://localhost:8000/api"):
        self.api = service_api

    def get(self, path):
        import requests
        url = "{}{}".format(self.api, path)
        response = requests.get(url)
        return response.json()
