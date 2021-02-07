from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from core.models import *
from core.utils import *


@login_required
def main(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    today = date.today()
    return render(request, 'teacher/main.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                 'timetable': get_timetable(today, user_class)})


@login_required
def timetable(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    today = date.today()
    return render(request, 'teacher/timetable.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                      'timetable': get_timetable_week(today, user_class)})


@login_required
def progress_table(request):
    url_name = request.resolver_match.url_name
    user = request.user
    student = Students.objects.filter(user=user)[0]
    user_name = student.name
    user_class = student.user_class
    return render(request, 'teacher/progress_table.html', {'url_name': url_name, 'class': user_class, 'name': user_name,
                                                           'a': get_progress_table(user, user_class)})


def authorization(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            return render(request, 'teacher/form.html', {'text': 'Incorrect login or password.'})
    else:
        return render(request, 'teacher/form.html')


def logout_view(request):
    logout(request)
    return redirect('/form')
