import json

from django.core.management.base import BaseCommand

from tournaments.models import SportType


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/SportType.json', encoding='utf-8') as data:
            for sport_type in json.loads(data.read()):
                SportType.objects.get_or_create(**sport_type)
