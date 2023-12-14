import json

from django.core.management.base import BaseCommand

from tournaments.models import Participant


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/Participants.json', encoding='utf-8') as data:
            for participant in json.loads(data.read()):
                Participant.objects.get_or_create(**participant)
