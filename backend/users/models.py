from django.contrib.auth.models import AbstractUser
from django.db import models

from users import enums


class User(AbstractUser):
    middle_name = models.CharField(
        'Отчество',
        max_length=enums.UserEnums.MIDDLE_NAME_MAX_LEN,
        null=True,
    )
    photo = models.ImageField(
        'Фотография',
        upload_to='images/',
    )
    bio = models.TextField(
        'Биография',
        max_length=enums.UserEnums.BIO_MAX_LEN,
    )

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ('last_name', 'first_name')

    def __str__(self):
        return f'{self.last_name} {self.first_name}'