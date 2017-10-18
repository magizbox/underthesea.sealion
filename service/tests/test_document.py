from unittest import TestCase
from tests.client import APIClient

client = APIClient(service_api="http://localhost:8001/api")


class TestDocument(TestCase):
    def test_act_filter_true(self):
        data = client.get('/documents/?status=ANNOTATED&quality=&corpus=1&act=true')
        act = data["results"][0]["act"]
        self.assertNotEquals(act, "[]")

    def test_act_filter_false(self):
        data = client.get('/documents/?status=ANNOTATED&quality=&corpus=1&act=false')
        act = data["results"][0]["act"]
        self.assertEquals(act, "[]")
