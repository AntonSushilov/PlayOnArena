from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from djoser.views import UserViewSet as DjoserViewSet
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

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


class TournamentViewSet(ModelViewSet):
    queryset = models.Tournament.objects.all()
    serializer_class = serializers.TournamentSerializer


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

