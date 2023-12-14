import json

from django.core.management.base import BaseCommand
from tqdm import tqdm

from tournaments.models import Participant, Team


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/Participants.json', encoding='utf-8') as data:
            for participant in tqdm(json.loads(data.read())):
                Participant.objects.get_or_create(
                    team=Team.objects.get(id=participant.pop('team')),
                    **participant
                )
