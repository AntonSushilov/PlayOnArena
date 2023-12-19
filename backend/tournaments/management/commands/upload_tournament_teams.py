import json

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from tqdm import tqdm

from tournaments.models import Tournament, Country, City, SportType, ScheduleSystemType, TournamentType
User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/TournamentTeams.json', encoding='utf-8') as data:
            for tournament_teams in tqdm(json.loads(data.read())):
                pass
                # Tournament.objects.get_or_create(
                #     country=Country.objects.get(id=tournament.pop('country')),
                #     city=City.objects.get(id=tournament.pop('city')),
                #     sport_type=SportType.objects.get(
                #         id=tournament.pop('sport_type')),
                #     organizer=User.objects.get(id=tournament.pop('organizer')),
                #     schedule_system_type=ScheduleSystemType.objects.get(
                #         id=tournament.pop('schedule_system_type')),
                #     tournament_type=TournamentType.objects.get(
                #         id=tournament.pop('tournament_type')),
                #     **tournament
                # )
