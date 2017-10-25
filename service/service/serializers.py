from rest_framework import serializers
from rest_framework_bulk import BulkListSerializer, BulkSerializerMixin

from service.models import Document, Corpus, Dialogue, DialogueCorpus, \
    DialogueDocument


class CorpusSerializer(serializers.ModelSerializer):
    # documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Corpus
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class DialogueCorpusSerializer(serializers.ModelSerializer):
    # documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = DialogueCorpus
        fields = '__all__'


class DialogueSerializer(serializers.ModelSerializer, BulkSerializerMixin):
    # documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Dialogue
        fields = '__all__'
        list_serializer_class = BulkListSerializer


class DialogueDocumentSerializer(serializers.ModelSerializer, BulkSerializerMixin):
    # documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = DialogueDocument
        fields = '__all__'
        list_serializer_class = BulkListSerializer