from django.shortcuts import render,redirect

from django.contrib.auth.models import User,auth
from django.http import HttpResponse

# Create your views here.

def signup(request):
    if request.method=='POST':
        firstName=request.POST.get('Fname')
        lastName=request.POST.get('Lname')
        password=request.POST.get('pass')
        email=request.POST.get('email')
        userName=request.POST.get('Uname')
        user=User.objects.create_user(username=userName,email=email,first_name=firstName,last_name=lastName,password=password)
        print('USER SUCCESSFULLY CREATED')
        return redirect('signup')
    
    else:
            return render(request,'signup.html')

def signin(request):
    if request.method=='POST':
        userName=request.POST.get('username')
        password=request.POST.get('password')

        user=auth.authenticate(username=userName,password=password)

        if user is not None:
            auth.login(request,user)
            print('USER SUCCESSFULLY LOG IN')
            return redirect('dashboard')
       


    else:
        return render(request,'signin.html')


def index(request):
    return render(request,'dashboard.html')

def service(request):
    return render(request,'service.html')


def Home(request):
    return render(request,'Home.html')


def BodyShop(request):
    return render(request,'BodyShop.html')

def Contact(request):
    return render(request,'Contact.html')

