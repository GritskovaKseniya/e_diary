from django.urls import path
from . import views

app_name = 'parent'
urlpatterns = [
    path('', views.main, name='main'),
    path('children', views.children, name='children'),
]
