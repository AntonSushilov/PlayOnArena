import json

from django.core.management.base import BaseCommand

from tournaments.models import Team


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/Teams.json', encoding='utf-8') as data:
            for team in json.loads(data.read()):
                Team.objects.get_or_create(**team)
