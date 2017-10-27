from django.db import models


class Corpus(models.Model):
    title = models.TextField()
    description = models.TextField(blank=True)

    def __str__(self):
        return "{} - {}".format(str(self.id), self.title)


class Document(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    amr = models.TextField(blank=True)
    sentiment = models.TextField(blank=True)
    category = models.TextField(blank=True)
    act = models.TextField(blank=True)
    meta = models.TextField(blank=True)
    status = models.TextField(blank=True)
    quality = models.TextField(blank=True)
    corpus = models.ForeignKey(Corpus, related_name="documents")

    class Meta:
        ordering = ('created',)


class DialogueCorpus(models.Model):
    title = models.TextField()
    description = models.TextField(blank=True)

    def __str__(self):
        return "{} - {}".format(str(self.id), self.title)


class Dialogue(models.Model):
    content = models.TextField()
    corpus = models.ForeignKey(DialogueCorpus, related_name="dialogues")
    status = models.TextField(blank=True, default="NEW")
    quality = models.TextField(blank=True, default="POOR")


class DialogueDocument(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    amr = models.TextField(blank=True)
    sentiment = models.TextField(blank=True)
    category = models.TextField(blank=True)
    act = models.TextField(blank=True)
    meta = models.TextField(blank=True)
    status = models.TextField(blank=True)
    quality = models.TextField(blank=True)
    ignore = models.TextField(blank=True)
    dialogue = models.ForeignKey(Dialogue, related_name="documents")
