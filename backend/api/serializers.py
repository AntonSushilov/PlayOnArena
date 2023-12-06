from django.db.models import fields
from rest_framework import serializers
from djoser.serializers import UserSerializer
from .models import (
    Profile,
    SportType, 
    Tournament,
    TournamentType, 
    TournamentScheduleSystem,
    Team,
    TeamParticipants,
    TeamsTournaments
)

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        # fields = ('id', 'title', 'description')
        fields = '__all__'


class TournamentTypeSerializer(serializers.ModelSerializer):
    # achievement_name = serializers.CharField(source='name')
    title = serializers.CharField(max_length=64)
    description = serializers.CharField()

    class Meta:
        model = TournamentType
        # fields = ('id', 'title', 'description')
        fields = '__all__'

class SportTypeSerializer(serializers.ModelSerializer):
    # achievement_name = serializers.CharField(source='name')
    title = serializers.CharField(max_length=64)
    description = serializers.CharField()

    class Meta:
        model = SportType
        # fields = ('id', 'title', 'description')
        fields = '__all__'

class TournamentScheduleSystemSerializer(serializers.ModelSerializer):
    # achievement_name = serializers.CharField(source='name')
    title = serializers.CharField(max_length=64)
    description = serializers.CharField()

    class Meta:
        model = TournamentScheduleSystem
        # fields = ('id', 'title', 'description')
        fields = '__all__'


class TeamParticipantsSerializer(serializers.ModelSerializer):
    # achievement_name = serializers.CharField(source='name')
    # title = serializers.CharField(max_length=64)
    # description = serializers.CharField()
    # sport_type_id = serializers.
    class Meta:
        model = TeamParticipants
        # fields = ('id', 'title', 'description')
        fields = '__all__'



class TeamSerializer(serializers.ModelSerializer):
    sport_type_id = SportTypeSerializer()
    captain_id = UserSerializer()
    creator_id = UserSerializer()
    # achievement_name = serializers.CharField(source='name')
    # title = serializers.CharField(max_length=64)
    # description = serializers.CharField()
    # sport_type_id = serializers.
    team_participants = TeamParticipantsSerializer(many=True, read_only=True)
    class Meta:
        model = Team
        # fields = ('id', 'title', 'description')
        fields = '__all__'


class TeamsTournamentsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TeamsTournaments
        fields = '__all__'


class TournamentSerializer(serializers.ModelSerializer):
    sport_type_id = SportTypeSerializer(read_only=True)
    tournament_type_id = TournamentTypeSerializer(read_only=True)
    tournament_system_id = TournamentScheduleSystemSerializer(read_only=True)
    organizer_id = UserSerializer(read_only=True)
    teams = TeamSerializer(read_only=True, many=True)
    # sport_type_id = serializers.SlugRelatedField(read_only=True, slug_field="title")
    # tournament_type_id = serializers.SlugRelatedField(read_only=True, slug_field="title")
    # tournament_system_id = serializers.SlugRelatedField(read_only=True, slug_field="title")
    # organizer_id = UserSerializer(read_only=True)

    class Meta:
        model = Tournament
        # fields = ('id', 'title', 'description')
        fields = '__all__'





