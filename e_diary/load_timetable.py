from core.models import *
from django.contrib.auth.models import User
import datetime
import pandas
from core.utils import *

excel_data_df = pandas.read_excel('timetable.xlsx', sheet_name='class5')
week_date = get_week_with_weekday(date.today())
# print whole sheet data

print(week_date)
print("")
print(excel_data_df)

for i in range(len(week_date)):
    day_str = week_date[i]['date'][:2]
    print(day_str)
