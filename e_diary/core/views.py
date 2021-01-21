from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.db import models
from datetime import date, datetime
import datetime
from core.models import *
from django.core.exceptions import ObjectDoesNotExist
from core.utils import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


@login_required
def main(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    today = date.today()
    return render(request, 'core/main.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                              'timetable': get_timetable(today, user_class)})


@login_required
def homework(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    today = date.today()
    if request.GET.get('date') is not None:
        today = datetime.strptime(request.GET.get('date'), '%Y-%m-%d')
    return render(request, 'core/homework.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                  'timetable': get_timetable(today, user_class),
                                                  'date': get_date_to_string(today)})


@login_required
def timetable(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    today = date.today()
    return render(request, 'core/timetable.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                   'timetable': get_timetable_week(today, user_class)})


@login_required
def progress_table(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    return render(request, 'core/progress_table.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                        'a': get_progress_table(user, user_class)})


@login_required
def grade(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    lessons = OneLesson.objects.filter(a_class=user_class).filter(lesson__is_active=True).values('lesson__name').distinct()
    today = date.today()
    week = get_week(today)
    week_date = get_week_with_weekday(today)
    if request.GET.get('date') is not None:
        week = get_week(datetime.strptime(request.GET.get('date'), '%Y-%m-%d'))
        week_date = get_week_with_weekday(datetime.strptime(request.GET.get('date'), '%Y-%m-%d'))
    return render(request, 'core/grade.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                               'week': week_date[:-1], 'grades': get_grades_for_week(lessons, week, user),
                                               'weekday_string': first_and_last_weekday_string(week)})


def authorization(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            return render(request, 'core/form.html', {'text': 'Incorrect username or password.'})
    else:
        return render(request, 'core/form.html')


def logout_view(request):
    logout(request)
    return redirect('/form')
