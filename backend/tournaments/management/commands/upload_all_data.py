from django.core.management.base import BaseCommand

from tournaments.management.commands import (
    upload_city,
    upload_country,
    upload_participant,
    upload_schedule_system_types,
    upload_sport_types,
    upload_team,
    upload_tournament,
    upload_tournament_types,
    upload_user
)


class Command(BaseCommand):
    def handle(self, *args, **options):
        upload_country.Command().handle()
        upload_city.Command().handle()
        upload_schedule_system_types.Command().handle()
        upload_sport_types.Command().handle()
        upload_tournament_types.Command().handle()
        upload_user.Command().handle()
        upload_team.Command().handle()
        upload_participant.Command().handle()
        upload_tournament.Command().handle()
