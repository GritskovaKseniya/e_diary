import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponse
from django.shortcuts import render, redirect

from core.utils import *


def group_required(*group_names):
    """Requires user membership in at least one of the groups passed in."""

    def in_groups(u):
        if bool(u.groups.filter(name__in=group_names)) | u.is_superuser:
            return True

    return user_passes_test(in_groups)


@login_required
@group_required('student')
def main(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    today = date.today()
    day = 'сегодня'
    if request.GET.get('date') is not None:
        today = datetime.strptime(request.GET.get('date'), '%Y-%m-%d')

    if today != date.today():
        day = today.strftime('%d.%m.%Y')
    return render(request, 'core/main.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                              'timetable': get_timetable(today, user_class),
                                              'day': day})


@login_required
@group_required('student')
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
@group_required('student')
def timetable(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    today = date.today()
    if request.GET.get('date') is not None:
        today = datetime.strptime(request.GET.get('date'), '%Y-%m-%d')
    return render(request, 'core/timetable.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                   'timetable': get_timetable_week(today, user_class),
                                                   'week': get_week_date(today)})


@login_required
@group_required('student')
def progress_table(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    lessons = OneLesson.objects.filter(a_class=user_class).filter(lesson__is_active=True).values(
        'lesson__name').distinct().order_by('lesson__name')
    today = date.today()
    quarter = get_quarter(today)
    quarter_days = get_quarter_days(quarter)
    if request.GET.get('quarter') is not None:
        quarter = get_quarter(int(request.GET.get('quarter')))
        quarter_days = get_quarter_days(quarter)
    quarter_date = get_grades_for_quarter(lessons, quarter, user)
    return render(request, 'core/progress_table.html',
                  {'url_name': url_name, 'class': user_class, 'name': user_name,
                   'quarter': quarter_days,
                   'grades': quarter_date,
                   'quarter_number': quarter.quarter_number})


@login_required
@group_required('student')
def progress_graph(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    return render(request, 'core/progress_graph.html', {'url_name': url_name,
                                                        'class': user_class, 'name': user_name})


@login_required
@group_required('student')
def grade(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    lessons = OneLesson.objects.filter(a_class=user_class).filter(lesson__is_active=True).values(
        'lesson__name').distinct().order_by('lesson__name')
    today = date.today()
    week = get_week(today)
    week_date = get_week_with_weekday(today)
    if request.GET.get('date') is not None:
        week = get_week(datetime.strptime(request.GET.get('date'), '%Y-%m-%d'))
        week_date = get_week_with_weekday(datetime.strptime(request.GET.get('date'), '%Y-%m-%d'))
    return render(request, 'core/grade.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                               'week': week_date[:-2],
                                               'grades': get_grades_for_week(lessons, week[:-2], user),
                                               'weekday_string': first_and_last_weekday_string(week)})


def authorization(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if len(Teachers.objects.filter(user=user)) != 0:
                return redirect('/students')
            elif len(Students.objects.filter(user=user)) != 0:
                return redirect('/')
            elif len(Parents.objects.filter(user=user)) != 0:
                return redirect('/parent')
        else:
            return render(request, 'core/form.html', {'text': 'Incorrect login or password.'})
    else:
        return render(request, 'core/form.html')


def logout_view(request):
    logout(request)
    return redirect('/form')
