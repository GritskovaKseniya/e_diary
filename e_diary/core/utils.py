import datetime as dt
from datetime import datetime, date, time
import calendar
from core.models import *


def get_progress_table(user, user_class):
    return 0


def get_timetable(date, user_class):
    time_list = OneLesson.objects.filter(date=date).filter(a_class=user_class)
    lessons_and_time = [{'number': 1, 'time': '09:00-09:45', 'title': 'нет урока', 'homework': '', 'comment': ''},
                        {'number': 2, 'time': '10:00-10:45', 'title': 'нет урока', 'homework': '', 'comment': ''},
                        {'number': 3, 'time': '11:00-11:45', 'title': 'нет урока', 'homework': '', 'comment': ''},
                        {'number': 4, 'time': '12:00-12:45', 'title': 'нет урока', 'homework': '', 'comment': ''},
                        {'number': 5, 'time': '13:00-13:45', 'title': 'нет урока', 'homework': '', 'comment': ''},
                        {'number': 6, 'time': '14:00-14:45', 'title': 'нет урока', 'homework': '', 'comment': ''},
                        {'number': 7, 'time': '15:00-15:45', 'title': 'нет урока', 'homework': '', 'comment': ''}
                        ]
    for lesson in time_list:
        one_lesson = list(filter(lambda x: x['time'] == str(lesson.lesson_time), lessons_and_time))[0]
        if str(lesson != ''):
            one_lesson['title'] = str(lesson)
        one_lesson['homework'] = lesson.homework
        one_lesson['comment'] = lesson.comment_teacher
    return lessons_and_time


def get_timetable_week(date, user_class):
    date_from = date - dt.timedelta(days=date.weekday())
    date_to = date + dt.timedelta(days=6 - date.weekday())
    result = []
    while date_from <= date_to:
        result.append({'date': get_date_to_string(date_from), 'lessons': get_timetable(date_from, user_class)})
        date_from += dt.timedelta(days=1)
    return result[:-2]


def get_week_with_weekday(date):
    date_from = date - dt.timedelta(days=date.weekday())
    date_to = date + dt.timedelta(days=6 - date.weekday())
    week = []
    while date_from <= date_to:
        week.append({'date': get_date_to_string_for_grade(date_from)})
        date_from += dt.timedelta(days=1)
    return week


def get_week(date):
    date_from = date - dt.timedelta(days=date.weekday())
    date_to = date + dt.timedelta(days=6 - date.weekday())
    week = []
    while date_from <= date_to:
        week.append(date_from)
        date_from += dt.timedelta(days=1)
    return week


def get_date_to_string_for_grade(date):
    week_days = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']
    return week_days[date.weekday()] + ' ' + date.strftime('%d.%m.%Y')


def get_grades_for_week(lessons, week, user):
    result = []
    for lesson in lessons:
        day_array = []
        for day in week[:-1]: # итерации с пн по сб
            lesson_t = OneLesson.objects.filter(lesson__name=lesson['lesson__name']).filter(date=day)
            grade_array = []
            for les in lesson_t:
                grades = Grade.objects.filter(student=user).filter(lesson=les)
                for grade in grades:
                    # print('grade', grade)
                    # print('lesson', lesson)
                    grade_array.append({'type': grade.grade_type, 'value': grade.grade})
            day_array.append({'date': day, 'grades': grade_array})
        result.append({'lesson': lesson['lesson__name'], 'days_and_grades': day_array })
    return result


def get_date_to_string(date):
    week_days = ['понедельник', 'вторник', 'среду', 'четверг', 'пятница', 'субботу', 'воскресенье']
    return week_days[date.weekday()] + ' ' + date.strftime('%d.%m.%Y')


def first_and_last_weekday_string(week):
    return week[0].strftime('%d.%m.%Y')+'-'+week[-1].strftime('%d.%m.%Y')