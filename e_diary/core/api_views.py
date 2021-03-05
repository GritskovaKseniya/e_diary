from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from teacher.utils import *
from django.contrib.auth.models import User
from core.models import OneLesson


@csrf_exempt
def homework_update(request):
    request_json = json.loads(request.body)  # переводит параметры POST запроса в json
    lesson = OneLesson.objects.filter(id=int(request_json.get('lessonId')))[0]
    lesson.homework = str(request_json.get('homework'))
    lesson.save()
    response = JsonResponse({})
    return response


@csrf_exempt
def comment_update(request):
    request_json = json.loads(request.body)  # переводит параметры POST запроса в json
    lesson = OneLesson.objects.filter(id=int(request_json.get('lessonId')))[0]
    lesson.comment_teacher = str(request_json.get('comment'))
    lesson.save()
    response = JsonResponse({})
    return response


# todo: this function
def grades_get(request):
    pass


# todo: this function
@csrf_exempt
def grades_update(request):
    request_json = json.loads(request.body)
    response = JsonResponse({})
    return response


def username_get(request):
    user = User.objects.filter(id=int(request.user.id))[0]
    teacher_name = Teachers.objects.filter(user=user.id)[0].name
    response = JsonResponse({'name': teacher_name}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response


def timetable_week_get(request):
    today = date.today()
    user = User.objects.filter(id=int(request.user.id))[0]
    timetable = get_timetable_week(today, user.id)
    response = JsonResponse({'schedule': timetable}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response


def timetable_day_get(request):
    today = date.today()
    user = User.objects.filter(id=int(request.user.id))[0]
    timetable = get_timetable(today, user.id)
    response = JsonResponse({'schedule': timetable}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response


def load_timetable(request):
    add_timetable()
    response = JsonResponse({})
    return response


def lessons_and_classes_list_get(request):
    user = User.objects.filter(id=int(request.user.id))[0]
    teacher = Teachers.objects.filter(user=user.id)[0]
    lessons = []
    array = OneLesson.objects.all().filter(teacher=teacher)
    for item in array:
        lessons.append(str(item.a_class.number) + ' класс ' + str(item.lesson.name))
    lessons = list(set(lessons))

    response = JsonResponse({'list': lessons}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response

def students_class_list(request):
    teacher = Teachers.objects.filter(user=User.objects.filter(id=int(request.user.id))[0])[0]
    classes_number = []
    array = OneLesson.objects.all().filter(teacher=teacher)
    for item in array:
        classes_number.append(item.a_class.number)
    classes_number = list(set(classes_number))
    classes_list = []
    students_list = []
    for class_number in classes_number:
        students = list(Students.objects.all().filter(user_class=class_number))
        for student in students:
            students_list.append(student.name)
        classes_list.append({'classList': list(students_list)})
    print(list(classes_list))

    response = JsonResponse({'ClassesList': list(classes_list)}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response



