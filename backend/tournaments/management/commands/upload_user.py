import json

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from tqdm import tqdm

User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('data/Users.json', encoding='utf-8') as data:
            for user in tqdm(json.loads(data.read())):
                new_user = User(
                    username=user['username'],
                    email=user['email']
                )
                new_user.set_password(user['password'])
                new_user.save()
