import json

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from tqdm import tqdm

from tournaments.models import Team, Country, City, SportType

User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/Teams.json', encoding='utf-8') as data:
            for team in tqdm(json.loads(data.read())):
                Team.objects.get_or_create(
                    country=Country.objects.get(id=team.pop('country')),
                    city=City.objects.get(id=team.pop('city')),
                    sport_type=SportType.objects.get(id=team.pop('sport_type')),
                    creator=User.objects.get(id=team.pop('creator')),
                    **team
                )
