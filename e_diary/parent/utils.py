import datetime as dt
from core.models import *
from datetime import datetime, date, time


def get_grades_for_quarter_p(lessons, quarter, student):
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
