from django.urls import path

from . import views

app_name = 'teacher'
urlpatterns = [
    path('', views.main, name='main'),
    path('form', views.authorization, name='form'),
    path('timetable', views.timetable, name='timetable'),
    path('progress_table', views.progress_table, name='progress_table'),
    path('logout', views.logout_view, name='logout')
]
