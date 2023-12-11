import base64

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from rest_framework import serializers

from tournaments import models

User = get_user_model()


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            image_format, image = data.split(';base64,')
            ext = image_format.split('/')[-1]
            data = ContentFile(base64.b64decode(image), name='temp.' + ext)
        return super().to_internal_value(data)


class CustomUserSerializer(serializers.ModelSerializer):
    photo = Base64ImageField()

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class TeamSerializer(serializers.ModelSerializer):
    logo = Base64ImageField()
    creator = CustomUserSerializer(read_only=True)

    class Meta:
        model = models.Team
        fields = '__all__'


class TournamentSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True)

    class Meta:
        model = models.Tournament
        fields = '__all__'


class ParticipantSerializer(serializers.ModelSerializer):
    photo = Base64ImageField()
    team = TeamSerializer

    class Meta:
        model = models.Participant
        fields = '__all__'


class MatchSerializer(serializers.ModelSerializer):
    owner = CustomUserSerializer
    guest = CustomUserSerializer

    class Meta:
        model = models.Match
        fields = '__all__'


class SportTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SportType
        fields = '__all__'


class TournamentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TournamentType
        fields = '__all__'


class ScheduleSystemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ScheduleSystemType
        fields = '__all__'

