from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login

from django.contrib.auth import get_user_model
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer


User = get_user_model() 


class RegistrationApi(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            user: UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginApi(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()
                                   ).data,
            "token": AuthToken.objects.create(user)
                                
        }) 


class UserApiTest(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        print(self.request.user)
        return queryset


class UserAPI(APIView):
    
    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        print(serializer.data)
        return Response(serializer.data)


