import json

from django.core.management.base import BaseCommand

from tournaments.models import City


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/Country.json', encoding='utf-8') as data:
            for city in json.loads(data.read()):
                City.objects.get_or_create(**city)
