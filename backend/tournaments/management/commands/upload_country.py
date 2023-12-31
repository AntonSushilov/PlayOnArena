import json

from django.core.management.base import BaseCommand
from tqdm import tqdm

from tournaments.models import Country


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/Country.json', encoding='utf-8') as data:
            for country in tqdm(json.loads(data.read())):
                Country.objects.get_or_create(**country)
