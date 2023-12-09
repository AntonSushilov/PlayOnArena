from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # avatar = models.ImageField(upload_to='profile_avatar', blank=True, null=True)
    avatar = models.CharField(max_length=128, blank=True, null=True)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class TournamentType(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()

    def __str__(self):
        return self.title


class TournamentScheduleSystem(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()

    def __str__(self):
        return self.title


class SportType(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()

    def __str__(self):
        return self.title


class Team(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()
    sport_type_id = models.ForeignKey(
        SportType, null=True, on_delete=models.SET_NULL, related_name='sport_type_id')
    captain_id = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name='captain_id')
    creator_id = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name='creator_id')

    def __str__(self):
        return self.title


class TeamParticipants(models.Model):
    fio = models.CharField(max_length=64)
    photo_path = models.CharField(max_length=64)
    team_id = models.ForeignKey(Team, related_name='team_participants', on_delete=models.CASCADE)
    def __str__(self):
        return self.fio


class Tournament(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()
    organizer_id = models.ForeignKey(User, on_delete=models.CASCADE)
    sport_type_id = models.ForeignKey(
        SportType, null=True, on_delete=models.SET_NULL, related_name="sport_type")
    tournament_type_id = models.ForeignKey(
        TournamentType, null=True, on_delete=models.SET_NULL, related_name="tournament_type")
    tournament_system_id = models.ForeignKey(
        TournamentScheduleSystem, null=True, on_delete=models.SET_NULL, related_name='tournament_system')
    teams = models.ManyToManyField(Team, through='TeamsTournaments', related_name='teams')
    
    def __str__(self):
        return self.title


class TeamsTournaments(models.Model):
    tournament_id = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    team_id = models.ForeignKey(Team, on_delete=models.CASCADE)
    # def __str__(self):
    #     return self.tournament_id


class Match(models.Model):
    team_home_id = models.ForeignKey(Team, null=True, on_delete=models.SET_NULL, related_name='team_home_id')
    team_away_id = models.ForeignKey(Team, null=True, on_delete=models.SET_NULL, related_name='team_away_id')
    datetime = models.DateTimeField()
    result = models.CharField(max_length=16)

    # def __str__(self):
    #     return "fff"
