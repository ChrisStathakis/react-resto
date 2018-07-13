from rest_framework import generics, permissions

from .serializers import ProductSerializer, CategorySerializer
from products.models import Product, Category

class ProductListApiView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(active=True)
    permission_classes = (permissions.IsAuthenticated,)


class ProductDetailApiView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(active=True)
    permission_classes = (permissions.IsAuthenticated,)

class CategoryApiView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(active=True)
    permission_classes = (permissions.IsAuthenticated,)


