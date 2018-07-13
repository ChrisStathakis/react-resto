from django.contrib import admin
from django.urls import path, include
from .api.views import ProductDetailApiView, ProductListApiView, CategoryApiView

urlpatterns = [
    path('product/', ProductListApiView.as_view(), name='api_products'),
    path('product/detail/<int:pk>/', ProductDetailApiView.as_view(), name='api_product_detail'),
    path('category/', CategoryApiView.as_view(), name='api_categories'),
]