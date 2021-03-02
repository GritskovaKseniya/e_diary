from django.shortcuts import render


# Create your views here.

def main(request):
    return render(request, 'student/index.html')


def static(request, path):
    return (request, path, )