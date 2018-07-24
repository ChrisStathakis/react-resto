from django.shortcuts import render, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login, logout
User = get_user_model()



def login_view(request):
    if request.POST:
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        user = authenticate(username=username, password=password)
        print(user)
        if user:
            login(request, user)
            return HttpResponseRedirect('/')
        else:
            messages.success(request, 'The credentials is invalid')
        
    return render(request, 'login.html')


def logout_view(request):
    user = request.user
    if user.is_authenticated:
        logout(request)
        return HttpResponseRedirect('/')
    return HttpResponseRedirect('/')