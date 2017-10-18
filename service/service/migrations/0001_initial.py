# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-18 03:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Corpus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('text', models.TextField()),
                ('amr', models.TextField(blank=True)),
                ('sentiment', models.TextField(blank=True)),
                ('category', models.TextField(blank=True)),
                ('act', models.TextField(blank=True)),
                ('meta', models.TextField(blank=True)),
                ('status', models.TextField(blank=True)),
                ('quality', models.TextField(blank=True)),
                ('corpus', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='service.Corpus')),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
