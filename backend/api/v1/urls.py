from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.v1 import views

router = DefaultRouter()
router.register('users', views.UserViewSet, 'users')
router.register('tournaments', views.TournamentViewSet, 'tournaments')
router.register('matches', views.MatchViewSet, 'matches')
router.register('teams', views.TeamViewSet, 'teams')
router.register('participants', views.ParticipantViewSet, 'participants')
router.register('schedule_system_types', views.ScheduleSystemTypeViewSet, 'schedule_system_types')
router.register('tournament_types', views.TournamentTypeViewSet, 'tournament_types')
router.register('sport_type', views.SportTypeViewSet, 'sport_type')

urlpatterns = (
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.authtoken'))
)
