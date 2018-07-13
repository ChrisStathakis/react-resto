from rest_framework import generics, permissions
import django_filters.rest_framework
from .serializers import TableSerializer
from ..models import Table

class TableApiView(generics.ListAPIView):
    serializer_class = TableSerializer
    queryset = Table.objects.filter(active=True)
    permission_classes = (permissions.IsAuthenticated, )
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('is_using', 'user_using')
    search_fields = ('title', )