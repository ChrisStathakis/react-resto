from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse



@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'products': reverse('api_products', request=request, format=format),
        'categories': reverse('api_categories', request=request, format=format),
        'tables': reverse('api_tables', request=request, format=format),
        'order': reverse('api_orders', request=request, format=format),
        'order_items': reverse('api_order_items', request=request, format=format),
        
        
    })


def index(request):
    return render(request, 'index.html')

