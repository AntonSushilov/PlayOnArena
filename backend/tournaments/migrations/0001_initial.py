# Generated by Django 3.2.4 on 2023-12-10 19:58

from django.db import migrations, models
import django.db.models.deletion
import tournaments.enums


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime', models.DateTimeField()),
                ('owner_points', models.PositiveSmallIntegerField(default=tournaments.enums.MatchEnums['POINTS_DEFAULT_VALUE'], verbose_name='Очки хозяев')),
                ('guest_points', models.PositiveSmallIntegerField(default=tournaments.enums.MatchEnums['POINTS_DEFAULT_VALUE'], verbose_name='Очки гостей')),
            ],
            options={
                'verbose_name': 'Матч',
                'verbose_name_plural': 'Матчи',
                'ordering': ('datetime',),
            },
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=tournaments.enums.ParticipantEnums['FULL_NAME_MAX_LENGTH'], verbose_name='ФИО')),
                ('photo', models.ImageField(upload_to='images/', verbose_name='Фотография')),
            ],
            options={
                'verbose_name': 'Участник',
                'verbose_name_plural': 'Участники',
                'ordering': ('full_name',),
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=tournaments.enums.TeamEnums['TITLE_MAX_LENGTH'], verbose_name='Название')),
                ('description', models.TextField(max_length=tournaments.enums.TeamEnums['DESCRIPTION_MAX_LENGTH'], verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'Команда',
                'verbose_name_plural': 'Команды',
                'ordering': ('title',),
            },
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=tournaments.enums.TournamentEnums['TITLE_MAX_LENGTH'], verbose_name='Название')),
                ('description', models.TextField(max_length=tournaments.enums.TournamentEnums['DESCRIPTION_MAX_LENGTH'], verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'Турнир',
                'verbose_name_plural': 'Турниры',
                'ordering': ('title',),
            },
        ),
        migrations.CreateModel(
            name='TypeModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=tournaments.enums.TypeEnums['TITLE_MAX_LENGTH'], verbose_name='Название')),
                ('description', models.TextField(max_length=tournaments.enums.TypeEnums['DESCRIPTION_MAX_LENGTH'], verbose_name='Описание')),
            ],
        ),
        migrations.CreateModel(
            name='ScheduleSystemType',
            fields=[
                ('typemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tournaments.typemodel')),
            ],
            options={
                'verbose_name': 'Система расписания',
                'verbose_name_plural': 'Системы расписания',
                'ordering': ('title',),
            },
            bases=('tournaments.typemodel',),
        ),
        migrations.CreateModel(
            name='SportType',
            fields=[
                ('typemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tournaments.typemodel')),
            ],
            options={
                'verbose_name': 'Вид спорта',
                'verbose_name_plural': 'Виды спорта',
                'ordering': ('title',),
            },
            bases=('tournaments.typemodel',),
        ),
        migrations.CreateModel(
            name='TournamentType',
            fields=[
                ('typemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tournaments.typemodel')),
            ],
            options={
                'verbose_name': 'Тип турнира',
                'verbose_name_plural': 'Типы турнира',
                'ordering': ('title',),
            },
            bases=('tournaments.typemodel',),
        ),
    ]