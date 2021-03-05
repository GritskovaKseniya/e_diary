import pandas
from core.utils import *
from core.models import *
import datetime as dt


def get_timetable(day_date, user):
    time_list = OneLesson.objects.filter(date=day_date).filter(teacher=Teachers.objects.filter(user=user)[0].id)
    lessons_and_time = [
        {'number': 1, 'time': '09:00-09:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': '',
         'id': None, 'date': ''},
        {'number': 2, 'time': '10:00-10:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': '',
         'id': None, 'date': ''},
        {'number': 3, 'time': '11:00-11:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': '',
         'id': None, 'date': ''},
        {'number': 4, 'time': '12:00-12:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': '',
         'id': None, 'date': ''},
        {'number': 5, 'time': '13:00-13:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': '',
         'id': None, 'date': ''},
        {'number': 6, 'time': '14:00-14:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': '',
         'id': None, 'date': ''},
        {'number': 7, 'time': '15:00-15:45', 'title': 'нет урока', 'class': '-', 'homework': '', 'comment': '',
         'id': None, 'date': ''}
    ]
    for lesson in time_list:
        one_lesson = list(filter(lambda x: x['time'] == str(lesson.lesson_time), lessons_and_time))[0]
        if str(lesson != ''):
            one_lesson['title'] = str(lesson)
            one_lesson['homework'] = lesson.homework
            one_lesson['class'] = str(lesson.a_class)
            one_lesson['comment'] = lesson.comment_teacher
            one_lesson['id'] = lesson.id
            one_lesson['date'] = lesson.date
    return lessons_and_time


def get_timetable_week(day_date, user):
    date_from = day_date - dt.timedelta(days=day_date.weekday())
    date_to = day_date + dt.timedelta(days=6 - day_date.weekday())
    result = []
    while date_from <= date_to:
        result.append({'date': get_date_to_string(date_from), 'lessons': get_timetable(date_from, user)})
        date_from += dt.timedelta(days=1)
    return result[:-2]


def add_timetable():
    class_name = pandas.read_excel('timetable.xlsx', sheet_name='class5', header=None, nrows=1)[0][0]
    schedule = pandas.read_excel('timetable.xlsx', sheet_name='class5', header=1)
    # todo: make week customisable
    week = get_week(date.today())
    # print(week)
    current_day = None
    lessons = []
    for index, column in schedule.iterrows():
        if type(column['День']) != float:
            # пустые строки почему-то типа float
            current_day = column['День'].strip()

        if type(column['Предмет']) != float:
            week_days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
            lesson_date = week[week_days.index(current_day)]
            hours = int(column['Время'].split('-')[0].split(':')[0])
            minutes = int(column['Время'].split('-')[0].split(':')[1])
            lesson_time = TimeSlot.objects.filter(time_begin=time(hour=hours, minute=minutes))[0]
            lesson = Lessons.objects.filter(name=column['Предмет'].strip())[0]
            teacher = Teachers.objects.filter(name=column['Учитель'].strip())[0]
            class_number = Classes.objects.filter(number=int(class_name.split(' ')[0]))[0]
            lessons.append(OneLesson(date=lesson_date, lesson_time=lesson_time, lesson=lesson, teacher=teacher,
                                     a_class=class_number))
            # print(lessons)

    for lesson in lessons:
        try:
            lesson.save()
            # print("успешно" + lesson.name + lesson.date)
            # return "УСПЕШНО!"
        except BaseException:
            old_lesson = OneLesson.objects.filter(date=lesson.date, lesson_time=lesson.lesson_time,
                                                  a_class=lesson.a_class)[0]
            old_lesson.delete()
            lesson.save()
