# Generated by Django 3.2.4 on 2023-12-14 21:57

from django.db import migrations, models
import tournaments.enums


class Migration(migrations.Migration):

    dependencies = [
        ('tournaments', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='ban_dates',
            field=models.CharField(blank=True, max_length=tournaments.enums.TeamEnums['TITLE_MAX_LENGTH'], null=True, verbose_name='Запрещенные дни'),
        ),
    ]
