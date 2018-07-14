from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from .views import index, api_root
urlpatterns = [
    path('api/', api_root),
    path('', index),

    path('create/<int:id>/', TemplateView.as_view(template_name='index.html')),

]