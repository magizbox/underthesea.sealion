#!/usr/bin/env bash
rm -rf ./service/db.sqlite3
rm -rf ./service/service/migrations/
cd service
python manage.py makemigrations service
python manage.py migrate