from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render


def group_required(*group_names):
    """Requires user membership in at least one of the groups passed in."""

    def in_groups(u):
        if bool(u.groups.filter(name__in=group_names)) | u.is_superuser:
            return True

    return user_passes_test(in_groups)


@login_required
@group_required('admin', 'teacher')
def main(request):
    return render(request, 'students/index.html')
