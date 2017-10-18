from rest_framework.filters import BaseFilterBackend


class ActFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if "act" in request.query_params:
            act = request.query_params["act"].lower()
            if act == "true":
                return queryset.exclude(act="[]")
            elif act == "false":
                return queryset.filter(act="[]")
            else:
                return queryset
        else:
            return queryset