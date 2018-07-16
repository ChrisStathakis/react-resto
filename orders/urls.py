
from django.urls import path
from .api.views import TableApiView, OrderApiView, OrderDetailApiView, TableApiDetailView, OrderItemApiListView
urlpatterns = [
    
    path('tables/', TableApiView.as_view(), name='api_tables'),
    path('table/detail/<int:pk>/', TableApiDetailView.as_view(), name='api_table_detail'),
    path('orders/', OrderApiView.as_view(), name='api_orders'),
    path('order/detail/<int:pk>/', OrderDetailApiView.as_view(), name='api_order_detail'),
    path('orders-items/', OrderItemApiListView.as_view(), name='api_order_items'),

]