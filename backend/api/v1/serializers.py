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


class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'photo', 'email', 'username',
            'first_name', 'middle_name', 'last_name'
        )


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.City
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


class ShortCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = ('id', 'name_ru')


class ShortCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.City
        fields = ('id', 'name_ru')


class ShortSportTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SportType
        fields = ('id', 'title')


class ShortTournamentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TournamentType
        fields = ('id', 'title')


class ShortScheduleSystemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ScheduleSystemType
        fields = ('id', 'title')


class TeamSerializer(serializers.ModelSerializer):
    logo = Base64ImageField()
    creator = ShortUserSerializer(read_only=True)
    country = ShortCountrySerializer(read_only=True)
    city = ShortCitySerializer(read_only=True)
    sport_type = ShortSportTypeSerializer(read_only=True)

    class Meta:
        model = models.Team
        fields = '__all__'


class TeamListSerializer(serializers.ModelSerializer):
    logo = Base64ImageField()
    country = ShortCountrySerializer(read_only=True)
    city = ShortCitySerializer(read_only=True)
    sport_type = ShortSportTypeSerializer(read_only=True)

    class Meta:
        model = models.Team
        fields = (
            'id',
            'title',
            'logo',
            'country',
            'city',
            'sport_type',
            'rating'
        )


class TournamentListSerializer(serializers.ModelSerializer):
    logo = Base64ImageField()
    country = ShortCountrySerializer(read_only=True)
    city = ShortCitySerializer(read_only=True)
    sport_type = ShortSportTypeSerializer(read_only=True)
    tournament_type = ShortTournamentTypeSerializer(read_only=True)
    schedule_system_type = ShortScheduleSystemTypeSerializer(read_only=True)
    organizer = ShortUserSerializer(read_only=True)
    teams_amount = serializers.SerializerMethodField()

    class Meta:
        model = models.Tournament
        fields = (
            'id',
            'title',
            'description',
            'logo',
            'organizer',
            'country',
            'city',
            'sport_type',
            'tournament_type',
            'schedule_system_type',
            'count_teams',
            'teams_amount'
        )

    def get_teams_amount(self, tournament):
        return tournament.teams.count()


class CustomUserSerializer(serializers.ModelSerializer):
    photo = Base64ImageField()
    created_teams = TeamListSerializer(many=True)
    tournaments = TournamentListSerializer(many=True)
    # teams_tournaments = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'photo', 'created_teams', 'tournaments')
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

    # def get_teams_tournaments(self, user):
    #     return models.Tournament.objects.filter(teams=models.Team.objects.filter(creator=user))


class TournamentSerializer(serializers.ModelSerializer):
    teams = TeamListSerializer(many=True)
    country = ShortCountrySerializer(read_only=True)
    city = ShortCitySerializer(read_only=True)
    sport_type = ShortSportTypeSerializer(read_only=True)
    tournament_type = ShortTournamentTypeSerializer(read_only=True)
    schedule_system_type = ShortScheduleSystemTypeSerializer(read_only=True)
    organizer = ShortUserSerializer(read_only=True)

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
    tournament = TournamentSerializer

    class Meta:
        model = models.Match
        fields = '__all__'
