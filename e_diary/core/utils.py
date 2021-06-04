import datetime as dt
from core.models import *
from datetime import datetime, date, time
import calendar


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


def get_week_date(date):
    date_from = date - dt.timedelta(days=date.weekday())
    date_to = date + dt.timedelta(days=6 - date.weekday())
    result = date_from.strftime('%d.%m.%Y') + "-" + date_to.strftime('%d.%m.%Y')
    return result


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
        # итерации с пн по пт
        for day in week:
            lesson_t = OneLesson.objects.filter(lesson__name=lesson['lesson__name']).filter(date=day)
            grade_array = []
            for les in lesson_t:
                grades = Grade.objects.filter(student=Students.objects.filter(user=user)[0]).filter(lesson=les)
                for grade in grades:
                    # print('grade', grade)
                    # print('lesson', lesson)
                    grade_array.append({'type': grade.grade_type, 'value': grade.grade})
            day_array.append({'date': day, 'grades': grade_array})
        result.append({'lesson': lesson['lesson__name'], 'days_and_grades': day_array})
    return result


def get_date_to_string(date):
    week_days = ['понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'субботу', 'воскресенье']
    return week_days[date.weekday()] + ' ' + date.strftime('%d.%m.%Y')


def first_and_last_weekday_string(week):
    return week[0].strftime('%d.%m.%Y') + '-' + week[-1].strftime('%d.%m.%Y')


def get_quarter(this_day):
    quarter_dates = DateSlot.objects.all()
    # Using an additional state variable, such as an index variable
    for idx, quarter_date in enumerate(quarter_dates):
        # checking exists date in quarter
        if quarter_date.date_begin <= this_day <= quarter_date.date_end:
            return quarter_date
        # checking exists date in this quarter and start of the next quarter
        elif quarter_date.quarter_number != 1 and quarter_date.quarter_number != 4 and quarter_date.date_begin <= this_day <= quarter_dates[idx + 1].date_begin:
            return quarter_date
        # checking exists date in summer vacation (out of 4 quarter)
        elif quarter_date.quarter_number == 4 and quarter_date.date_end <= this_day:
            return quarter_date
        # checking exists date in summer vacation (out of 1 quarter)
        elif quarter_date.quarter_number == 1 and quarter_date.date_begin >= this_day:
            return quarter_date


def get_quarter_days(quarter):
    quarter_days = []
    date_from = quarter.date_begin
    date_to = quarter.date_end
    while date_from <= date_to:
        quarter_days.append({'date': date_from.strftime('%d.%m.%Y')})
        date_from += dt.timedelta(days=1)
    return quarter_days


def get_grades_for_quarter(lessons, quarter, user):
    result = []
    for lesson in lessons:
        day_array = []
        amount = 0.0
        number = 1
        date_from = quarter.date_begin
        date_to = quarter.date_end
        quarter_days = []
        while date_from <= date_to:
            quarter_days.append(date_from)
            date_from += dt.timedelta(days=1)
        for day in quarter_days:
            lesson_t = OneLesson.objects.filter(lesson__name=lesson['lesson__name']).filter(date=day)
            grade_array = []
            for les in lesson_t:
                grades = Grade.objects.filter(student=Students.objects.filter(user=user)[0]).filter(lesson=les)
                for grade in grades:
                    grade_array.append({'type': grade.grade_type, 'value': grade.grade})
                    amount = amount + float(grade.grade)
                    number = number + 1
            day_array.append({'date': day, 'grades': grade_array})
            GPA = 0
            if number != 1:
                GPA = amount / (number - 1)
        result.append({'lesson': lesson['lesson__name'], 'days_and_grades': day_array, 'GPA': round(GPA, 1)})
    return result


def get_grades_for_quarter2(lessons, quarter, student):
    result = []
    for lesson in lessons:
        day_array = []
        amount = 0.0
        number = 1
        date_from = quarter.date_begin
        date_to = quarter.date_end
        quarter_days = []
        while date_from <= date_to:
            quarter_days.append(date_from)
            date_from += dt.timedelta(days=1)
        for day in quarter_days:
            lesson_t = OneLesson.objects.filter(lesson__name=lesson['lesson__name']).filter(date=day)
            grade_array = []
            for les in lesson_t:
                grades = Grade.objects.filter(student=student).filter(lesson=les)
                for grade in grades:
                    grade_array.append({'type': grade.grade_type, 'value': grade.grade})
                    amount = amount + float(grade.grade)
                    number = number + 1
            day_array.append({'date': day, 'grades': grade_array})
            GPA = 0
            if number != 1:
                GPA = amount / (number - 1)
        result.append({'lesson': lesson['lesson__name'], 'days_and_grades': day_array, 'GPA': round(GPA, 1)})
    return result
