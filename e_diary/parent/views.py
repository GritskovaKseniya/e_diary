from django.shortcuts import render
from core.utils import *
from django.contrib.auth.decorators import login_required, user_passes_test

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
    return render(request, 'parent/main.html', {'text': mass})
