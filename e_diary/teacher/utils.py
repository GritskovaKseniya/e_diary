from core.models import *
import datetime as dt

from core.utils import get_date_to_string


def get_timetable(day_date, user):
    time_list = OneLesson.objects.filter(date=day_date).filter(teacher=Teachers.objects.filter(user=user)[0].id)
    lessons_and_time = [
        {'number': 1, 'time': '09:00-09:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': ''},
        {'number': 2, 'time': '10:00-10:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': ''},
        {'number': 3, 'time': '11:00-11:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': ''},
        {'number': 4, 'time': '12:00-12:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': ''},
        {'number': 5, 'time': '13:00-13:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': ''},
        {'number': 6, 'time': '14:00-14:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': ''},
        {'number': 7, 'time': '15:00-15:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': ''}
        ]
    for lesson in time_list:
        one_lesson = list(filter(lambda x: x['time'] == str(lesson.lesson_time), lessons_and_time))[0]
        if str(lesson != ''):
            one_lesson['title'] = str(lesson)
            one_lesson['homework'] = lesson.homework
            one_lesson['class'] = str(lesson.a_class)
            one_lesson['comment'] = lesson.comment_teacher
    return lessons_and_time


def get_timetable_week(day_date, user):
    date_from = day_date - dt.timedelta(days=day_date.weekday())
    date_to = day_date + dt.timedelta(days=6 - day_date.weekday())
    result = []
    while date_from <= date_to:
        result.append({'date': get_date_to_string(date_from), 'lessons': get_timetable(date_from, user)})
        date_from += dt.timedelta(days=1)
    return result[:-2]
