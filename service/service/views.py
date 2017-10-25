import django_filters
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework_bulk import BulkModelViewSet, \
    ListBulkCreateUpdateDestroyAPIView

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
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)


class DialogueViewSet(BulkModelViewSet):
    queryset = Dialogue.objects.all()
    serializer_class = DialogueSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('corpus', )


class DialogueDocumentViewSet(BulkModelViewSet):
    queryset = DialogueDocument.objects.all()
    serializer_class = DialogueDocumentSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('dialogue', )
