from rest_framework import serializers
from orders.models import Order, OrderItem, Table


class TableSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_table_detail')

    class Meta:
        model = Table
        fields = ['title', 'id', 'is_using', 'user_using', 'ordering', 'url', 'last_active_table']
    

class OrderSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_order_detail')
    
    class Meta:
        model = Order
        fields = ['title', 'table_related', 'tag_table_related',
                  'user_created', 'user_edited', 'active', 'is_paid',  
                  'tag_is_paid', 'value', 'paid_value', 'tag_order_items',
                  'last_active_table', 'url'
                ]


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields= ['id', 'tag_product_related', 'product_related', 'order_related',
                 'value', 'paid_value', 'is_paid'
                ]