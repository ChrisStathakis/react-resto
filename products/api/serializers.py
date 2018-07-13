from rest_framework import serializers

from products.models import Product, Category


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['title', 'id', 'value', 'category', 'tag_category']

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        field = ['title', 'active']