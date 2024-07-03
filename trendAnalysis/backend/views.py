from django.http import HttpResponse,response
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
# from django.db import IntegrityError
# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
# from .models import UserModel

def home_page(request):
    return HttpResponse("home")

@csrf_exempt
@api_view(['POST'])
def register_view(request):
    print(request.POST)
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        username_exists = User.objects.filter(username=username).exists()
        email_exists = User.objects.filter(email=email).exists()

        if username_exists or email_exists:
            error_message = ""
            if username_exists:
                error_message += "Username already exists. "
            if email_exists:
                error_message += "Email already registered. "
            return HttpResponse(error_message)
        try:
            created = User.objects.create_user(username=username, email=email, password=password)
            created.save()
            print("User created successfully!")
            return redirect('api/login')
        except Exception as e: 
            print(f"Error creating user: {e}")
            return HttpResponse("Error occured")  # status=status.HTTP_500_INTERNAL_SERVER_ERROR

    else:
        return render(request, 'register.html')

@csrf_exempt
def login_view(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    email_exists = User.objects.filter(email=email).exists()
    
    if email_exists:
        request.session['logged_in'] = True
    if not email_exists:
        return HttpResponse("User not found Signup first")
        
    return redirect('/')

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        # print("logged out")
        logout(request)
        return redirect('/api/login/')

def home_Analysis(request):
    return HttpResponse("analysis")