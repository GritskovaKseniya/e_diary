from django.urls import path
from . import api_views

urlpatterns = [
    path('homework/get', api_views.homework_get),
    path('homework/update', api_views.homework_update),
    path('comment/get', api_views.comment_get),
    path('comment/update', api_views.comment_update),
    path('grade/get', api_views.grades_get),
    path('grade/update', api_views.grades_update),
    path('user/get-name', api_views.username_get),
    path('schedule/week', api_views.timetable_week_get),
    path('schedule/day', api_views.timetable_day_get)
]
