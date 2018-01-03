from rest_framework.filters import BaseFilterBackend
from django.db.models import Q
import json

from service.models import DialogueDocument, Dialogue
from service.serializers import DialogueDocumentSerializer


class ActFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if "act" in request.query_params:
            act = request.query_params["act"].lower()
            if act == "true":
                return queryset.exclude(Q(act="[]") | Q(act=""))
            elif act == "false":
                return queryset.filter(Q(act="[]") | Q(act=""))
            else:
                return queryset
        else:
            return queryset


class CategoryFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if "category" in request.query_params:
            act = request.query_params["category"].lower()
            if act == "true":
                return queryset.exclude(Q(category="[]") | Q(category=""))
            elif act == "false":
                return queryset.filter(Q(category="[]") | Q(category=""))
            else:
                return queryset
        else:
            return queryset


def chunks(l, n):
    """Yield successive n-sized chunks from l."""
    for i in range(0, len(l), n):
        yield l[i:i + n]


class CorpusFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if "corpus" not in request.query_params:
            return queryset
        corpus = request.query_params["corpus"]
        queryset = queryset.select_related('dialogue__corpus').filter(dialogue__corpus_id=corpus)
        return queryset


class SentimentFilterBackend(BaseFilterBackend):
    def _is_check_sentiment(self, object):
        try:
            sentiment = json.loads(object["sentiment"])
        except Exception as e:
            sentiment = []
        sentiment = sorted(["{}#{}".format(item["aspect"], item["polarity"]) for item in sentiment])
        try:
            automatic_sentiment = json.loads(object["auto_sentiment"])
        except Exception as e:
            automatic_sentiment = []
        automatic_sentiment = sorted(["{}#{}".format(item["aspect"], item["polarity"]) for item in automatic_sentiment])
        return sentiment == automatic_sentiment

    def filter_queryset(self, request, queryset, view):
        if "sentiment" in request.query_params:
            sentiment = request.query_params["sentiment"].lower()
            if sentiment == "true":
                return queryset.exclude(Q(sentiment="[]") | Q(sentiment=""))
            elif sentiment == "false":
                return queryset.filter(Q(sentiment="[]") | Q(sentiment=""))
        if "sentiment_result" in request.query_params:
            sentiment_result = request.query_params["sentiment_result"].lower()
            sentiment_result = True if sentiment_result == "true" else False
            if sentiment_result:
                items = queryset.exclude(
                    Q(sentiment="") | Q(auto_sentiment="") | Q(sentiment="[]") | Q(auto_sentiment="[]")).values()
            else:
                    items = queryset.values()
            output = []
            for item in items:
                if self._is_check_sentiment(item) == sentiment_result:
                    document = DialogueDocument()
                    document.init_data(item)
                    output.append(document)
            return output
        return queryset


class StatusDialogueDocumentFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if "status" in request.query_params:
            status = request.query_params["status"].upper()
            return queryset.filter(Q(status=status))
        return queryset


class QualityDialogueDocumentFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if "quality" in request.query_params:
            quality = request.query_params["quality"].upper()
            return queryset.filter(Q(quality=quality))
        return queryset



