
from django.urls import path
from .api.views import TableApiView
urlpatterns = [
    
    path('orders/', TableApiView.as_view(), name='api_tables')
]