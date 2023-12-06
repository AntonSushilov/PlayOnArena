from django.urls import path
from .views import (
    ProfileApiView,
    ProfileRUDApiView,
    SportTypeListApiView,
    SportTypeCreateApiView,
    SportTypeRUDApiView,
    TournamentListApiView,
    TournamentCreateApiView,
    TournamentRUDApiView,
    TournamentTypeListApiView,
    TournamentTypeCreateApiView,
    TournamentTypeRUDApiView,
    TournamentScheduleSystemListApiView,
    TournamentScheduleCreateApiView,
    TournamentScheduleSystemRUDApiView,
    TeamListApiView,
    TeamCreateApiView,
    TeamRUDApiView,
    TeamParticipantCreateApiView,
    TeamParticipantRUDApiView,
    TeamsTournamentsListApiView,
    TeamsTournamentsCreateApiView,

    ShuffleList
)


urlpatterns = [
    path('profile/<int:pk>', ProfileApiView.as_view()),
    path('profile/edit/<int:pk>', ProfileRUDApiView.as_view()),
    path('tournament/', TournamentListApiView.as_view()),
    path('tournament/create', TournamentCreateApiView.as_view()),
    path('tournament/<int:pk>', TournamentRUDApiView.as_view()),
    path('tournamenttypes/', TournamentTypeListApiView.as_view()),
    path('tournamenttypes/create', TournamentTypeCreateApiView.as_view()),
    path('tournamenttypes/<int:pk>', TournamentTypeRUDApiView.as_view()),
    path('tournamentschedulesystems/',
        TournamentScheduleSystemListApiView.as_view()),
    path('tournamentschedulesystems/create',
        TournamentScheduleCreateApiView.as_view()),
    path('tournamentschedulesystems/<int:pk>',
        TournamentScheduleSystemRUDApiView.as_view()),
    path('sporttypes/', SportTypeListApiView.as_view()),
    path('sporttypes/create', SportTypeCreateApiView.as_view()),
    path('sporttypes/<int:pk>', SportTypeRUDApiView.as_view()),
    path('teams/', TeamListApiView.as_view()),
    path('teams/create', TeamCreateApiView.as_view()),
    path('teams/<int:pk>', TeamRUDApiView.as_view()),
    # path('teamparticipants/', TeamListApiView.as_view()),
    path('teamparticipants/create', TeamParticipantCreateApiView.as_view()),
    path('teamparticipants/<int:pk>', TeamParticipantRUDApiView.as_view()),
    # path('teams/<int:pk>', TeamListApiView.as_view()),
    
    path('teamstournaments/', TeamsTournamentsListApiView.as_view()),
    path('teamstournaments/create', TeamsTournamentsCreateApiView.as_view()),
    # path('teamstournaments/<int:pk>', TeamParticipantRUDApiView.as_view()),

    path('shaffle_list/', ShuffleList.as_view()),

]
