
from django.urls import path
from .api.views import TableApiView
urlpatterns = [
    
    path('tables/', TableApiView.as_view(), name='api_tables')
]