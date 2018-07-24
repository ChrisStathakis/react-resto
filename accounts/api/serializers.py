from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login


User = get_user_model() 

class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password']
                                        )

        
        return user


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('email', 'username', 'id')



class LoginUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'password']

    def validate(self, data):
        user = authenticate(**data)
        if user:
            login(self.context['request'], user)
            return user
        raise serializers.ValidationError("Unable to log in with provided credentialsll.")


