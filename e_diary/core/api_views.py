from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from teacher.utils import *
from django.contrib.auth.models import User

from core.models import OneLesson


def response_with_headers(data):
    response = JsonResponse(data)
    response['Access-Control-Allow-Origin'] = "*"
    return response


def homework_get(request):
    homework = OneLesson.objects.filter(id=int(request.GET.get('lesson_id')))[0].homework
    return response_with_headers({'homework': homework})


@csrf_exempt
def homework_update(request):
    request_json = json.loads(request.body)  # переводит параметры POST запроса в json
    lesson = OneLesson.objects.filter(id=int(request_json.get('lesson_id')))[0]
    lesson.homework = str(request_json.get('homework'))
    lesson.save()
    return response_with_headers({})


def comment_get(request):
    comment = OneLesson.objects.filter(id=int(request.GET.get('lesson_id')))[0].comment_teacher
    return response_with_headers({'comment': comment})


@csrf_exempt
def comment_update(request):
    request_json = json.loads(request.body)  # переводит параметры POST запроса в json
    lesson = OneLesson.objects.filter(id=int(request_json.get('lesson_id')))[0]
    lesson.comment_teacher = str(request_json.get('comment'))
    lesson.save()
    return response_with_headers({})


# todo: this function
def grades_get(request):
    pass


# todo: this function
@csrf_exempt
def grades_update(request):
    request_json = json.loads(request.body)
    return response_with_headers({})


def username_get(request):
    user = User.objects.filter(id=int(request.GET.get('user_id')))[0]
    teacher_name = Teachers.objects.filter(user=user.id)[0].name
    return response_with_headers({'name': teacher_name})


def timetable_week_get(request):
    today = date.today()
    user = User.objects.filter(id=int(request.GET.get('user_id')))[0]
    timetable = get_timetable_week(today, user.id)
    return response_with_headers({'schedule': timetable})


def timetable_day_get(request):
    today = date.today()
    user = User.objects.filter(id=int(request.GET.get('user_id')))[0]
    timetable = get_timetable(today, user.id)
    return response_with_headers({'schedule': timetable})
