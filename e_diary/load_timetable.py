from core.models import *
import datetime
import pandas
from core.utils import *


def add_timetable():
    class_name = pandas.read_excel('timetable.xlsx', sheet_name='class5', header=None, nrows=1)[0][0]
    schedule = pandas.read_excel('timetable.xlsx', sheet_name='class5', header=1)
    # todo: make week customisable
    week = get_week(date.today())
    print(week)
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
            print(lessons)
            lessons.append(OneLesson(date=lesson_date, lesson_time=lesson_time, lesson=lesson, teacher=teacher,
                                     a_class=class_number))

    for lesson in lessons:
        try:
            # lesson.save()
            print("TRY" + lesson.lesson + lesson.date)
        except BaseException:
            old_lesson = OneLesson.objects.filter(date=lesson.date, lesson_time=lesson.lesson_time,
                                                  a_class=lesson.a_class)[0]
            old_lesson.delete()
            print("EXCEPT" + lesson.lesson + lesson.date)
            # lesson.save()

if __name__ == "__main__":
    add_timetable();
