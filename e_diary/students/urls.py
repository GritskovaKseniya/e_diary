from django.urls import path, re_path
from django.contrib.staticfiles.views import serve

import core
from . import views

app_name = 'students'
urlpatterns = [
    path('', views.main, name='main'),
    re_path(r'^static/(?P<path>.*)$', serve)
]
