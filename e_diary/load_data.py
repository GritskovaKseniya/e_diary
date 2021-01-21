from core.models import Classes, Teachers, Lessons, TimeSlot, Students
from django.contrib.auth.models import User
import datetime

import json

user = User.objects.create_user(username='john', password='johnpassword')
user.save()
user = User.objects.create_user(username='vas', password='vaspassword')
user.save()
user = User.objects.create_user(username='pit', password='pitpassword')
user.save()
user = User.objects.create_user(username='mikael', password='mikaelpassword')
user.save()

with open('data.json', 'r') as file:
    data = json.load(file)

for cls in data['classes']:
    try:
        classes = Classes(number=cls['name'])
        classes.save()
    except BaseException:
        pass

for les in data['lessons']:
    try:
        lesson = Lessons(name=les['name'], is_active=les['is_active'])
        lesson.save()
    except BaseException:
        pass

for tch in data['teachers']:
    try:
        teacher = Teachers(user=User.objects.filter(username=tch['username'])[0], name=tch['name'])
        teacher.save()
    except BaseException:
        pass

for time in data['TimeSlot']:
    try:
        [begin, end] = time['time'].split('-')
        [hours, minutes] = begin.split(':')
        time_begin = datetime.time(int(hours), int(minutes))
        [hours, minutes] = end.split(':')
        time_end = datetime.time(int(hours), int(minutes))
        time_slot = TimeSlot(time_begin=time_begin, time_end=time_end)
        time_slot.save()
    except BaseException:
        pass

for std in data['Students']:
    try:
        student = Students(user=User.objects.filter(username=std['username'])[0], name=std['name'],
                       user_class=Classes.objects.filter(number=std['user_class'])[0])
        student.save()
    except BaseException:
        pass


