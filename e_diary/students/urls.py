from django.urls import path, re_path
from django.contrib.staticfiles.views import serve

import core
from . import views

app_name = 'students'
urlpatterns = [
    re_path(r'^static/(?P<path>.*)$', serve),
    re_path(r'^.*$', views.main, name='main')
]
