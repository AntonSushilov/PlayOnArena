import json

from django.core.management.base import BaseCommand

from tournaments.models import City, Country


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/City.json', encoding='utf-8') as data:
            for city in json.loads(data.read()):
                City.objects.get_or_create(
                    country=Country.objects.get(id=city.pop('country')),
                    **city
                )
