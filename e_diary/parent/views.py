from django.shortcuts import render
from core.utils import *
from parent.utils import *
from django.contrib.auth.decorators import login_required, user_passes_test
from datetime import date


def group_required(*group_names):
    """Requires user membership in at least one of the groups passed in."""

    def in_groups(u):
        if bool(u.groups.filter(name__in=group_names)) | u.is_superuser:
            return True

    return user_passes_test(in_groups)


@login_required
@group_required('parents')
def main(request):
    url_name = request.resolver_match.url_name
    user = request.user
    parent = Parents.objects.filter(user=user)[0]
    user_name = parent.name
    mass = "Hello, " + str(user_name) + "!"
    children_names = []
    for child in parent.children.all():
        name = str(child.name)
        children_names.append({'name': name, 'class': str(child.user_class)})
    return render(request, 'parent/main.html', {'text': mass, 'name': str(user_name), 'url_name': url_name,
                                                'children': children_names})


@login_required
@group_required('parents')
def children(request):
    url_name = request.resolver_match.url_name
    child_name = request.GET.get('name')
    child_class = request.GET.get('class')
    user = request.user
    parent = Parents.objects.filter(user=user)[0]
    user_name = parent.name
    # requested_date = request.GET.get('date', date.today())
    # if type(requested_date) == 'str':
    #     requested_date = requested_date.fromisoformat('%Y-%m-%d')

    student = Students.objects.filter(name=child_name, user_class=child_class)[0]
    lessons = OneLesson.objects.filter(a_class=student.user_class).filter(lesson__is_active=True).values(
            'lesson__name').distinct().order_by('lesson__name')
    # print(type(requested_date))

    # today = date.today()
    # quarter = get_quarter(today)
    # quarter_days = get_quarter_days(quarter)

    # quarter = get_quarter(requested_date)
    # quarter_days = get_quarter_days(quarter)
    # quarter_date = get_grades_for_quarter_p(lessons, quarter, student)

    today = date.today()
    quarter = get_quarter(today)
    quarter_days = get_quarter_days(quarter)
    if request.GET.get('date') is not None:
        quarter = get_quarter(datetime.strptime(request.GET.get('date'), '%Y-%m-%d').date())
        quarter_days = get_quarter_days(quarter)
    quarter_date = get_grades_for_quarter2(lessons, quarter, student)
    return render(request, 'parent/children.html', {'text': 'успеваемость', 'name': str(user_name),
                                                    'url_name': url_name,
                                                    'child_name': child_name, 'class': child_class,
                                                    'quarter': quarter_days, 'grades': quarter_date,
                                                    'quarter_number': quarter.quarter_number})
