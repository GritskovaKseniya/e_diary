from django.contrib import admin
from .models import Teachers, Lessons, Students, OneLesson, Grade, Classes, TimeSlot, DateSlot, Parents


admin.site.register(Teachers)
admin.site.register(Lessons)
admin.site.register(Students)
admin.site.register(OneLesson)
admin.site.register(Grade)
admin.site.register(Classes)
admin.site.register(TimeSlot)
admin.site.register(DateSlot)
admin.site.register(Parents)

