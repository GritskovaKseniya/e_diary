from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from core.models import *
from teacher.utils import get_timetable, get_timetable_week


@login_required
def main(request):
    url_name = request.resolver_match.url_name
    user = request.user
    teacher = Teachers.objects.filter(user=user)[0]
    user_name = teacher.name
    today = date.today()
    return render(request, 'teacher/main.html', {'url_name': url_name, 'name': user_name,
                                                 'timetable': get_timetable(today, user)})


@login_required
def timetable(request):
    url_name = request.resolver_match.url_name
    user = request.user
    teacher = Teachers.objects.filter(user=user)[0]
    user_name = teacher.name
    today = date.today()
    return render(request, 'teacher/timetable.html', {'url_name': url_name, 'name': user_name,
                                                      'timetable': get_timetable_week(today, user)})


@login_required
def progress_table(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    return render(request, 'teacher/progress_table.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                           'a': get_progress_table(user, user_class)})
