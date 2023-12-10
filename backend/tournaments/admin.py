from django.contrib import admin

from tournaments import models


class TypeAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')
    list_filter = ('title',)


@admin.register(models.SportType)
class SportTypeTypeAdmin(TypeAdmin):
    ...


@admin.register(models.TournamentType)
class TournamentTypeAdmin(TypeAdmin):
    ...


@admin.register(models.ScheduleSystemType)
class ScheduleSystemTypeAdmin(TypeAdmin):
    ...


@admin.register(models.Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'description',
        'sport_type',
        'captain',
        'creator'
    )
    list_filter = (
        'title',
        'sport_type',
        'captain',
        'creator'
    )


@admin.register(models.Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'photo', 'team')
    list_filter = ('full_name', 'team')


@admin.register(models.Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'id',
        'description',
        'organizer',
        'sport_type',
        'tournament_type',
        'schedule_system_type',
    )
    list_filter = (
        'title',
        'organizer',
        'sport_type',
        'tournament_type',
        'schedule_system_type'
    )
    filter_horizontal = ('teams',)


@admin.register(models.Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        'owner',
        'guest',
        'datetime',
        'owner_points',
        'guest_points'
    )
    list_filter = (
        'owner',
        'guest',
        'datetime'
    )
