from rest_framework.filters import BaseFilterBackend
from django.db.models import Q


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


class SentimentFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if "sentiment" in request.query_params:
            sentiment = request.query_params["sentiment"].lower()
            if sentiment == "true":
                return queryset.exclude(Q(sentiment="[]") | Q(act=""))
            elif sentiment == "false":
                return queryset.filter(Q(sentiment="[]") | Q(act=""))
            else:
                return queryset
        else:
            return queryset
