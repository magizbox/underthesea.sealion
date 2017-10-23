import django_filters
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from service.filters import ActFilterBackend, CategoryFilterBackend, \
    SentimentFilterBackend
from service.models import Document, Corpus, DialogueCorpus, Dialogue, \
    DialogueDocument
from service.serializers import DocumentSerializer, CorpusSerializer, \
    DialogueCorpusSerializer, DialogueSerializer, DialogueDocumentSerializer


def homepage(request):
    return render(request, 'index.html')


class CorpusViewSet(viewsets.ModelViewSet):
    queryset = Corpus.objects.all()
    serializer_class = CorpusSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend, ActFilterBackend,
        CategoryFilterBackend, SentimentFilterBackend, SearchFilter,)
    filter_fields = ('status', 'quality', 'corpus')
    search_fields = ('text',)


class DialogueCorpusViewSet(viewsets.ModelViewSet):
    queryset = DialogueCorpus.objects.all()
    serializer_class = DialogueCorpusSerializer


class DialogueViewSet(viewsets.ModelViewSet):
    queryset = Dialogue.objects.all()
    serializer_class = DialogueSerializer


class DialogueDocumentViewSet(viewsets.ModelViewSet):
    queryset = DialogueDocument.objects.all()
    serializer_class = DialogueDocumentSerializer
