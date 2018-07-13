from django.contrib import admin
from django.urls import path, include

from .views import index, api_root
urlpatterns = [
    path('api/', api_root),
    path('', index),
]