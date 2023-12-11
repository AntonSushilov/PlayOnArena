from django.contrib.auth import get_user_model
from django.db import models

from tournaments import enums

User = get_user_model()


class TypeModel(models.Model):
    title = models.CharField(
        'Название',
        max_length=enums.TypeEnums.TITLE_MAX_LENGTH
    )
    description = models.TextField(
        'Описание',
        max_length=enums.TypeEnums.DESCRIPTION_MAX_LENGTH
    )

    class Meta:
        abstract = True


class SportType(TypeModel):
    class Meta:
        verbose_name = 'Вид спорта'
        verbose_name_plural = 'Виды спорта'
        ordering = ('title',)

    def __str__(self):
        return self.title


class TournamentType(TypeModel):
    class Meta:
        verbose_name = 'Тип турнира'
        verbose_name_plural = 'Типы турнира'
        ordering = ('title',)

    def __str__(self):
        return self.title


class ScheduleSystemType(TypeModel):
    class Meta:
        verbose_name = 'Система расписания'
        verbose_name_plural = 'Системы расписания'
        ordering = ('title',)

    def __str__(self):
        return self.title


class Team(models.Model):
    title = models.CharField(
        'Название',
        max_length=enums.TeamEnums.TITLE_MAX_LENGTH
    )
    logo = models.ImageField(
        'Логотип',
        upload_to='images/',
    )
    description = models.TextField(
        'Описание',
        max_length=enums.TeamEnums.DESCRIPTION_MAX_LENGTH
    )
    city = models.CharField(
        'Город',
        max_length=enums.TeamEnums.CITY_MAX_LENGTH
    )
    ban_dates = models.CharField(
        'Запрещенные дни',
        max_length=enums.TeamEnums.BAN_DATES_MAX_LENGTH
    )
    sport_type = models.ForeignKey(
        SportType,
        models.SET_NULL,
        related_name='teams',
        verbose_name='Вид спорта',
        null=True
    )
    creator = models.ForeignKey(
        User,
        models.CASCADE,
        related_name='created_teams',
        verbose_name='Создатель'
    )

    class Meta:
        verbose_name = 'Команда'
        verbose_name_plural = 'Команды'
        ordering = ('title',)

    def __str__(self):
        return self.title


class Participant(models.Model):
    full_name = models.CharField(
        'ФИО',
        max_length=enums.ParticipantEnums.FULL_NAME_MAX_LENGTH
    )
    photo = models.ImageField(
        'Фотография',
        upload_to='images/',
    )
    team = models.ForeignKey(
        Team,
        models.CASCADE,
        related_name='participants'
    )
    is_captain = models.BooleanField(
        'Капитан',
        default=False
    )

    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'
        ordering = ('full_name',)

    def __str__(self):
        return self.full_name


class Tournament(models.Model):
    title = models.CharField(
        'Название',
        max_length=enums.TournamentEnums.TITLE_MAX_LENGTH
    )
    description = models.TextField(
        'Описание',
        max_length=enums.TournamentEnums.DESCRIPTION_MAX_LENGTH
    )
    organizer = models.ForeignKey(
        User,
        models.CASCADE,
        related_name='tournaments',
        verbose_name='Организатор'
    )
    sport_type = models.ForeignKey(
        SportType,
        models.SET_NULL,
        related_name='tournaments',
        verbose_name='Вид спорта',
        null=True
    )
    tournament_type = models.ForeignKey(
        TournamentType,
        models.SET_NULL,
        related_name='tournaments',
        verbose_name='Вид турнира',
        null=True
    )
    schedule_system_type = models.ForeignKey(
        ScheduleSystemType,
        models.SET_NULL,
        related_name='tournaments',
        verbose_name='Система расписания',
        null=True
    )
    teams = models.ManyToManyField(
        Team,
        related_name='tournaments',
        verbose_name='Команды'
    )

    class Meta:
        verbose_name = 'Турнир'
        verbose_name_plural = 'Турниры'
        ordering = ('title',)

    def __str__(self):
        return self.title


class Match(models.Model):
    owner = models.ForeignKey(
        Team,
        models.SET_NULL,
        related_name='owned_matches',
        verbose_name='Хозяева',
        null=True
    )
    guest = models.ForeignKey(
        Team,
        models.SET_NULL,
        related_name='guested_matches',
        verbose_name='Гости',
        null=True
    )
    datetime = models.DateTimeField(null=True)
    owner_points = models.PositiveSmallIntegerField(
        'Очки хозяев',
        default=enums.MatchEnums.POINTS_DEFAULT_VALUE
    )
    guest_points = models.PositiveSmallIntegerField(
        'Очки гостей',
        default=enums.MatchEnums.POINTS_DEFAULT_VALUE
    )
    round = models.PositiveSmallIntegerField(
        'Раунд',
        default=enums.MatchEnums.POINTS_DEFAULT_VALUE
    )

    class Meta:
        verbose_name = 'Матч'
        verbose_name_plural = 'Матчи'
        ordering = ('datetime',)

    def __str__(self):
        return f'Хозяева: "{self.owner.title}" - Гости: "{self.guest.title}"'
