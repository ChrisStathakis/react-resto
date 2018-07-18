from django.urls import path
from .api.views import RegistrationApi, LoginApi, UserAPI, UserApiTest

urlpatterns = [
    path('register/', RegistrationApi.as_view(), name='api_register_view'),
    path('login/', LoginApi.as_view(), name='api_login_view'),
    path('user/', UserApiTest.as_view(), name='api_user_view'),
]