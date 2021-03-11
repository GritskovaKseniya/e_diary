from django.urls import path
from . import api_views

urlpatterns = [
    path('homework/update', api_views.homework_update),
    path('comment/update', api_views.comment_update),
    path('grade/get', api_views.grades_get),
    path('grade/update', api_views.grades_update),
    path('user/get-name', api_views.username_get),
    path('schedule/week', api_views.timetable_week_get),
    path('schedule/day', api_views.timetable_day_get),
    path('schedule/load', api_views.load_timetable),
    path('lessonsandclasses/list/get', api_views.lessons_and_classes_list_get),
    path('students/listname/get', api_views.students_class_list),
    path('grade_list/get', api_views.grade_list)
]
