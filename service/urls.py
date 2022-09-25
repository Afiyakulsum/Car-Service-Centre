from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('dashboard',views.index),
    path('',views.signup),
    path('signin',views.signin),
    path('signin.html',views.signin),
    path('service',views.service),
    path('dashboard.html',views.index),
    path('Home',views.Home),
    path('BodyShop',views.BodyShop),
    path('Contact',views.Contact),





    

    



]