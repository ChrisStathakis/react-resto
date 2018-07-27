
from django.contrib import admin
from django.urls import path, include
from accounts.views import login_view, logout_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login_view),
    path('logout/', logout_view),

    path('rest-auth/', include('rest_auth.urls')),

    path('api/', include('products.urls')),
    path('api/', include('accounts.urls')),
    path('api/', include('orders.urls')),
    path('auth/', include('accounts.urls')),
    path('', include('frontend.urls')),

]
