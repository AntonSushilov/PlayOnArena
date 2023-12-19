import json

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from tqdm import tqdm

from tournaments.models import Tournament, Team, Country, City, SportType, ScheduleSystemType, TournamentType

User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/Tournaments.json', encoding='utf-8') as data:
            for tournament in tqdm(json.loads(data.read())):
                teams = Team.objects.filter(id__in=tournament.pop('teams'))
                tournament = Tournament.objects.get_or_create(
                    country=Country.objects.get(id=tournament.pop('country')),
                    city=City.objects.get(id=tournament.pop('city')),
                    sport_type=SportType.objects.get(
                        id=tournament.pop('sport_type')),
                    organizer=User.objects.get(id=tournament.pop('organizer')),
                    schedule_system_type=ScheduleSystemType.objects.get(
                        id=tournament.pop('schedule_system_type')),
                    tournament_type=TournamentType.objects.get(
                        id=tournament.pop('tournament_type')),
                    # teams=1,
                    **tournament
                )
                print(tournament)
                tournament[0].teams.add(*teams)
