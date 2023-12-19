from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from djoser.views import UserViewSet as DjoserViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework import status, generics

from api.v1 import paginators, permissions, serializers
from tournaments import models

User = get_user_model()


class UserViewSet(DjoserViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.CustomUserSerializer
    pagination_class = paginators.PageNumberPagination


class TeamViewSet(ModelViewSet):
    queryset = models.Team.objects.select_related('creator')
    serializer_class = serializers.TeamSerializer
    pagination_class = paginators.PageNumberPagination
    filter_backends = (DjangoFilterBackend,)

    def list(self, request, **kwargs):
        serializer = serializers.TeamListSerializer(
            models.Team.objects.all(), many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = models.Team.objects.all()
        team = get_object_or_404(queryset, pk=pk)
        serializer = serializers.TeamSerializer(team)
        return Response(serializer.data)


class TournamentViewSet(ModelViewSet):
    queryset = models.Tournament.objects.all()
    serializer_class = serializers.TournamentSerializer
    def list(self, request, **kwargs):
        serializer = serializers.TournamentListSerializer(
            models.Tournament.objects.all(), many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = models.Tournament.objects.all()
        tournament = get_object_or_404(queryset, pk=pk)
        serializer = serializers.TournamentSerializer(tournament)
        return Response(serializer.data)


class ParticipantViewSet(ModelViewSet):
    queryset = models.Participant.objects.all()
    serializer_class = serializers.ParticipantSerializer


class MatchViewSet(ModelViewSet):
    queryset = models.Match.objects.all()
    serializer_class = serializers.MatchSerializer


class SportTypeViewSet(ReadOnlyModelViewSet):
    queryset = models.SportType.objects.all()
    serializer_class = serializers.SportTypeSerializer
    permission_classes = (permissions.IsAdminOrReadOnly,)


class TournamentTypeViewSet(ReadOnlyModelViewSet):
    queryset = models.TournamentType.objects.all()
    serializer_class = serializers.TournamentTypeSerializer
    permission_classes = (permissions.IsAdminOrReadOnly,)


class ScheduleSystemTypeViewSet(ReadOnlyModelViewSet):
    queryset = models.ScheduleSystemType.objects.all()
    serializer_class = serializers.ScheduleSystemTypeSerializer
    permission_classes = (permissions.IsAdminOrReadOnly,)


class RoundRobin(APIView):
    def post(self, request):

        template = {
            "datetime": None,
            "guest": None,
            "guest_points": 0,
            "owner": None,
            "owner_points": 0,
            "round": 0,
            "tournament": request.data.get('tournament_id'),
        }
        result = []
        for i, matches in enumerate(
                self.__round_robin(
                    request.data.get('team_ids'),
                    request.data.get('day_off', 'Dat off'),
                    request.data.get('double', False)
                )
        ):
            for j, match in enumerate(matches):
                result.append({
                    **template,
                    "guest": match[0],
                    "owner": match[-1],
                    "round": i + 1
                })
        return Response(result, status=status.HTTP_200_OK)

    @staticmethod
    def __round_robin(team_ids, day_off='Day off', double=False):
        if len(team_ids) % 2:
            team_ids.append(day_off)

        n = len(team_ids)
        matches = []
        fixtures = []
        for fixture in range(1, n):
            for i in range(int(n / 2)):
                matches.append([team_ids[i], team_ids[n - 1 - i]])
            team_ids.insert(1, team_ids.pop())
            fixtures.insert(int(len(fixtures) / 2), matches)
            matches = []
        if double:
            count_matches = len(fixtures)
            for i in range(count_matches):
                fixtures.append([m[::-1] for m in fixtures[i]])
        result_matches = []
        for i, matches in enumerate(fixtures):
            for match in matches:
                template = {
                    "owner": match[0],
                    "guest": match[-1],
                    "datetime": None,
                    "owner_points": 0,
                    "guest_points": 0,
                    "round": i
                }
                result_matches.append(template)
        return fixtures


class CreateTournament(generics.CreateAPIView):
    def post(self, request, **kwargs):
        print(request.data)
        serializer = serializers.MatchSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
