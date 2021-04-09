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


def username_get(request):
    user = User.objects.filter(id=int(request.user.id))[0]
    teacher_name = Teachers.objects.filter(user=user.id)[0].name
    response = JsonResponse({'name': teacher_name}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response


def timetable_week_get(request):
    request_date = request.GET.get('date')
    user = User.objects.filter(id=int(request.user.id))[0]
    timetable = get_timetable_week(datetime.strptime(request_date, '%Y-%m-%d'), user.id)
    response = JsonResponse({'schedule': timetable}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response


def timetable_day_get(request):
    request_date = request.GET.get('date')
    user = User.objects.filter(id=int(request.user.id))[0]
    timetable = get_timetable(datetime.strptime(request_date, '%Y-%m-%d'), user.id)
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


@csrf_exempt
def grade_list(request):
    request_json = json.loads(request.body)  # переводит параметры POST запроса в json
    user = User.objects.filter(id=int(request.user.id))[0]
    teacher = Teachers.objects.filter(user=user.id)[0]
    all_grades = []
    select_lesson = ""
    select_class = 0
    array = OneLesson.objects.all().filter(teacher=teacher)
    for item in array:
        lessons = str(item.a_class.number) + ' класс ' + str(item.lesson.name)
        # проверили совпадает ли выбранный урок с уроком в массиве
        if str(request_json.get('lesson')) == lessons:
            select_lesson = item.lesson
            select_class = item.a_class

    # получаю список класса по предмету
    students = Students.objects.all().filter(user_class=select_class).order_by('name')
    # print(students)
    # получаю все уроки этого учителя и этого класса
    selected_lessons = OneLesson.objects.all().filter(teacher=teacher).filter(lesson=select_lesson).order_by('date')
    lessons_date = []
    lessons_date_test = []
    for student in students:
        tmp = []
        for lesson in selected_lessons:
            student_grade_list = Grade.objects.all().filter(lesson=lesson).filter(student=student)
            # print(student_grade_list)
            lessons_date.append(lesson.date)

            for grade in student_grade_list:
                tmp.append({'date': lesson.date, 'grade': grade.grade, 'type': norm_view_for(grade.grade_type)})
                lessons_date_test.append({"date": lesson.date, "type": norm_view_for(grade.grade_type)})
                # print("TMP", tmp)
        all_grades.append({'student': student.name, 'grades': tmp})
    # print("ALL GRADES: ", all_grades)
    # print("ALL DATES: ", sorted(list(set(lessons_date))))
    # print("ALL DATES TEST: ", lessons_date_test)
    response = JsonResponse({"data": [{"gradeLists": all_grades}, {"lessonsDate": sorted(list(set(lessons_date)))}]},
                            safe=False, json_dumps_params={'ensure_ascii': False})
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
        classes_list.append({'classMembers': list(students_list)})
    print(list(classes_list))

    response = JsonResponse({'classesList': list(classes_list)}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response


def grades_value(request):
    user = User.objects.filter(id=int(request.user.id))[0]
    value = []
    for val in GradeList.choices:
        value.append(val[0])
    response = JsonResponse({'gradesValue': value}, safe=False, json_dumps_params={'ensure_ascii': False})
    return response


@csrf_exempt
def grades_update(request):
    teacher = Teachers.objects.filter(user=User.objects.filter(id=int(request.user.id))[0])[0]
    request_json = json.loads(request.body)  # переводит параметры POST запроса в json
    student = Students.objects.filter(name=request_json.get('student'))[0]
    print("1 ", student)
    request_date = datetime.strptime(request_json.get('date'), '%Y-%m-%d')
    print("2 ", request_date)
    lesson = request_json.get('lesson')

    array = OneLesson.objects.all().filter(teacher=teacher).filter(date=request_date)
    for item in array:
        lesson_str = str(item.a_class.number) + ' класс ' + str(item.lesson.name)
        if lesson_str == str(lesson):
            lesson = item
    print("3 ", lesson)
    """
    grades = request_json.get('grades')
    db_grades = Grade.objects.all().filter(lesson=lesson, student=student)
    for grade in grades:
        if grade['grade'] == 0:
            if grade['type'] in db_grades:
                # TODO: delete Grade object
        elif grade['type'] in db_grades:
            if grade['grade'] != db_grades.filter(grade['type']).value:
                # TODO: update Grade object: only grade.value
        elif:
            # TODO: create new object: student, lesson, date, grade.value, grade,type
    """
    """
            print("7 ", grade, grade['type'])
            print("222", norm_view_for(db_grade.grade_type))
            res = {key: value for (key, value) in grade.items() if value == norm_view_for(db_grade.grade_type)}
            print("444", res['type'])
            # print(grade[str(norm_view_for(db_grade.grade_type))])
            # print("4 ", grade)
            # print("6 ", db_grade)
            # print(db_grade.grade_type, ";", from_str_to_choise(grade['type']))
            # print(db_grade.grade, ";", grade['grade'])

                if db_grade.grade_type == from_str_to_choise(grade['type']):
                    print("T", db_grade.grade_type, ";", from_str_to_choise(grade['type']))
                    print("TT", db_grade.grade, ";", grade['grade'])
                    if db_grade.grade != grade['grade']:
                        print("TTT", db_grade.grade_type, ";", from_str_to_choise(grade['type']))
                        print("TTT", db_grade.grade, ";", grade['grade'])
                        db_grade.grade = int(grade['grade'])
                        db_grade.grade_date = date.today
                    print("ОБНОВЛЕННАЯ ОЦЕНКА", db_grade.student, db_grade.lesson, db_grade.grade,
                          norm_view_for(db_grade.grade_type))
                    # db_grade.save()
                    break

                elif db_grade.grade_type != from_str_to_choise(grade['type']):
                    if db_grade.grade != grade['grade']:
                    print(db_grade.grade, 'AND', grade['grade'], "; ", norm_view_for(db_grade.grade_type),
                          grade['type'])
                    the_grade = Grade(student=student, lesson=lesson, grade=int(grade['grade']),
                                      grade_type=from_str_to_choise(grade['type']))
                    # the_grade.save()
                    print("НОВАЯ ОЦЕНКА", the_grade.student, the_grade.lesson, the_grade.grade,
                          norm_view_for(the_grade.grade_type))
                    break

        elif grade['grade'] == 0:
            print("УДАЛЕННАЯ ОЦЕНКА", the_grade.student, the_grade.lesson, the_grade.grade,
                    norm_view_for(the_grade.grade_type))
    """
    return JsonResponse({})
