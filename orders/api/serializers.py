from rest_framework import serializers
from orders.models import Order, OrderItem, Table


class TableSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Table
        fields = ['title', 'id', 'is_using', 'user_using', 'ordering']
    