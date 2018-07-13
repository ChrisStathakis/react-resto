from django.contrib import admin
from .models import Table, Order, OrderItem
# Register your models here.


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ['title', 'active', 'is_using', 'user_using', 'ordering']
    list_filter = ['active', 'user_using', 'is_using']
    search_fields = ['title']
