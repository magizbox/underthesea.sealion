import django_filters
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from service.filters import ActFilterBackend
from service.models import Document, Corpus
from service.serializers import DocumentSerializer, CorpusSerializer


def homepage(request):
    return render(request, 'index.html')


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, ActFilterBackend, SearchFilter,)
    filter_fields = ('status', 'quality', 'corpus')
    search_fields = ('text', )


class CorpusViewSet(viewsets.ModelViewSet):
    queryset = Corpus.objects.all()
    serializer_class = CorpusSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
