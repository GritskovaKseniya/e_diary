from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.db import models
from datetime import date, datetime
import datetime
from core.models import *
from django.core.exceptions import ObjectDoesNotExist
from core.utils import *


def main(request):
    if len(LogUser.objects.all()) == 0:
        return redirect('/form')
    url_name = request.resolver_match.url_name
    user = LogUser.objects.all()[0].key
    user_name = user.name
    user_class = user.user_class
    today = date.today()
    return render(request, 'core/main.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                              'timetable': get_timetable(today, user_class)})


def homework(request):
    if len(LogUser.objects.all()) == 0:
        return redirect('/form')
    url_name = request.resolver_match.url_name
    user = LogUser.objects.all()[0].key
    user_name = user.name
    user_class = user.user_class
    today = date.today()
    if request.GET.get('date') is not None:
        today = datetime.strptime(request.GET.get('date'), '%Y-%m-%d')
    return render(request, 'core/homework.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                  'timetable': get_timetable(today, user_class),
                                                  'date': get_date_to_string(today)})


def timetable(request):
    if len(LogUser.objects.all()) == 0:
        return redirect('/form')
    url_name = request.resolver_match.url_name
    user = LogUser.objects.all()[0].key
    user_name = user.name
    user_class = user.user_class
    today = date.today()
    return render(request, 'core/timetable.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                   'timetable': get_timetable_week(today, user_class)})


def progress_table(request):
    if len(LogUser.objects.all()) == 0:
        return redirect('/form')
    url_name = request.resolver_match.url_name
    user = LogUser.objects.all()[0].key
    user_name = user.name
    user_class = user.user_class
    return render(request, 'core/progress_table.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                        'a': get_progress_table(user, user_class)})


def grade(request):
    if len(LogUser.objects.all()) == 0:
        return redirect('/form')
    url_name = request.resolver_match.url_name
    user = LogUser.objects.all()[0].key
    user_name = user.name
    user_class = user.user_class
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
        login = request.POST.get('login')
        password = request.POST.get('password')
        try:
            user = Students.objects.get(login=login, password=password)
            print("USER ", Students.objects.all())
            if len(LogUser.objects.filter(key=user)) > 0:
                key = LogUser.objects.all()[0]
                key.delete()
                key = LogUser(key=user)
                key.save()
                return redirect('/')
            else:
                key = LogUser(key=user)
                key.save()
                return redirect('/')
        except ObjectDoesNotExist:
            return HttpResponse(status=400)
    else:
        return render(request, 'core/form.html')


def quit(request):
    user = LogUser.objects.all()[0]
    user.delete()
    return render(request, 'core/form.html')
