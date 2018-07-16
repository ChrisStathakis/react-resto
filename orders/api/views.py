from rest_framework import generics, permissions
import django_filters.rest_framework
from .serializers import TableSerializer, OrderSerializer, OrderItemSerializer
from ..models import Table, Order, OrderItem

class TableApiView(generics.ListAPIView):
    serializer_class = TableSerializer
    queryset = Table.objects.filter(active=True)
    permission_classes = (permissions.IsAuthenticated, )
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('is_using', 'user_using')
    search_fields = ('title', )


class TableApiDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = TableSerializer
    queryset = Table.objects.filter(active=True)
    permission_classes = (permissions.IsAuthenticated, )
    


class OrderApiView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = (permissions.IsAuthenticated, )

    def perform_create(self, serializer):
        serializer.save(user_created=self.request.user, 
                        user_edited=self.request.user,
                        )

    
class OrderDetailApiView(generics.RetrieveDestroyAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = (permissions.IsAuthenticated,)


class OrderItemApiListView(generics.ListCreateAPIView):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()
    permission_classes = (permissions.IsAuthenticated, )
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('order_related', 'product_related')

    def perform_create(self, serializer):
        serializer.save(user_created=self.request.user,
                        user_edited=self.request.user
                        )

    