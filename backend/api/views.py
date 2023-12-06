from rest_framework import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from utils.utils import shuffle_list

# AllowAny – полный доступ;
# IsAuthenticated – только для авторизованных пользователей;
# IsAdminUser – только для администраторов;
# IsAuthenticatedOrReadOnly – только для авторизованных или всем, но для чтения.
from django.contrib.auth import get_user_model

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
from .serializers import (
    ProfileSerializer,
    SportTypeSerializer, 
    TournamentSerializer,
    TournamentTypeSerializer,
    TournamentScheduleSystemSerializer,
    TeamSerializer,
    TeamParticipantsSerializer,
    TeamsTournamentsSerializer
)
User = get_user_model()

# Profile
class ProfileApiView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileRUDApiView(generics.RetrieveUpdateDestroyAPIView):
    def get(self, request, pk):
        # print(request.user)
        # user = request.user
        pk = self.kwargs['pk']
        user = User.objects.get(pk=pk)
        profile = Profile.objects.get(user=user)
        
        # print(user)
        # queryset = Profile.objects.get(user=user)
        data = ProfileSerializer(profile).data
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        new_profile = request.data
        # print(data)
        user = request.user
        
        profile = Profile.objects.get(user=user)
        # print(ProfileSerializer(profile))
        # profile.user = user
        profile_serializer = ProfileSerializer(profile, data=new_profile)
        if profile_serializer.is_valid(): 
            profile_serializer.save() 
            return Response(profile_serializer.data, status=status.HTTP_200_OK)
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    # permission_classes = (IsAuthenticated, )



# TournamentType
class TournamentTypeListApiView(generics.ListAPIView):
    queryset = TournamentType.objects.all()
    serializer_class = TournamentTypeSerializer
    # permission_classes = (IsAdminUser, )


class TournamentTypeCreateApiView(generics.CreateAPIView):
    queryset = TournamentType.objects.all()
    serializer_class = TournamentTypeSerializer
    # permission_classes = (IsAdminUser, )


class TournamentTypeRUDApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TournamentType.objects.all()
    serializer_class = TournamentTypeSerializer
    # permission_classes = (IsAdminUser, )


# TournamentScheduleSystem
class TournamentScheduleSystemListApiView(generics.ListAPIView):
    queryset = TournamentScheduleSystem.objects.all()
    serializer_class = TournamentScheduleSystemSerializer


class TournamentScheduleCreateApiView(generics.CreateAPIView):
    queryset = TournamentScheduleSystem.objects.all()
    serializer_class = TournamentScheduleSystemSerializer
    # permission_classes = (IsAdminUser, )

class TournamentScheduleSystemRUDApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TournamentScheduleSystem.objects.all()
    serializer_class = TournamentScheduleSystemSerializer
    # permission_classes = (IsAdminUser, )


# SportType
class SportTypeListApiView(generics.ListAPIView):
    queryset = SportType.objects.all()
    serializer_class = SportTypeSerializer
    # permission_classes = (IsAdminUser, )

class SportTypeCreateApiView(generics.CreateAPIView):
    queryset = SportType.objects.all()
    serializer_class = SportTypeSerializer
    # permission_classes = (IsAdminUser, )

class SportTypeRUDApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SportType.objects.all()
    serializer_class = SportTypeSerializer
    # permission_classes = (IsAdminUser, )


# Team
class TeamListApiView(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    # permission_classes = (IsAdminUser, )


class TeamCreateApiView(generics.CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    # permission_classes = (IsAuthenticated, )

class TeamRUDApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    # permission_classes = (IsAuthenticated, )


# TeamParticipant
class TeamParticipantCreateApiView(generics.CreateAPIView):
    def post(self, request):
        serializer = TeamParticipantsSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # queryset = TeamParticipants.objects.all()
    # serializer_class = TeamParticipantsSerializer
    # permission_classes = (IsAdminUser, )

class TeamParticipantRUDApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TeamParticipants.objects.all()
    serializer_class = TeamParticipantsSerializer
    # permission_classes = (IsAdminUser, )


# Tournament
class TournamentListApiView(generics.ListAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    # permission_classes = (IsAdminUser, )


class TournamentCreateApiView(generics.CreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    # permission_classes = (IsAuthenticated, )

class TournamentRUDApiView(generics.RetrieveUpdateDestroyAPIView):
    # def get(self, request, pk):
    #     # print(request.user)
    #     # user = request.user
    #     pk = self.kwargs['pk']
    #     tournament = Tournament.objects.get(pk=pk)
    #     print(tournament)

    #     # teams = Team.objects.get(pk=team_tournament.)
    #     # print(user)
    #     # queryset = Profile.objects.get(user=user)
    #     data = TournamentSerializer(tournament).data
    #     # data = ''
    #     return Response(data, status=status.HTTP_200_OK)
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    # permission_classes = (IsAuthenticated, )


# TeamsTournaments
class TeamsTournamentsListApiView(generics.ListAPIView):
    queryset = TeamsTournaments.objects.all()
    serializer_class = TeamsTournamentsSerializer
    # permission_classes = (IsAdminUser, )


class TeamsTournamentsCreateApiView(generics.CreateAPIView):
    def post(self, request):
        serializer = TeamsTournamentsSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # queryset = TeamsTournaments.objects.all()
    # serializer_class = TeamsTournamentsSerializer
    # permission_classes = (IsAuthenticated, )



# shuffle_list
class ShuffleList(APIView):
    def post(self, request):
        try:
            lst = request.data
            return Response(shuffle_list(lst), status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response(ex, status=status.HTTP_400_BAD_REQUEST)

