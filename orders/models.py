from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import F, Sum

from products.models import Product

User = get_user_model()


class Table(models.Model):
    title = models.CharField(unique=True, max_length=150)
    active = models.BooleanField(default=True)
    is_using = models.BooleanField(default=True)
    user_using = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    ordering = models.IntegerField(default=0)


    def __str__(self):
        return self.title


class Order(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    user_created = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='order_created')
    user_edited = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='order_edited')
    active = models.BooleanField(default=True)
    is_paid = models.BooleanField(default=False)

    table_related = models.ForeignKey(Table, on_delete=models.SET_NULL, null=True)  
    title = models.CharField(blank=True, max_length=200)

    value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    paid_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    

    def __str__(self): 
        return f'Τραπέζι {self.table_related.title} - Order {self.id}'

    def save(self, *args, **kwargs):
        order_items = self.order_items.all()
        self.value  = order_items.aggregate(Sum('total_value'))['total_value__sum'] if order_items else 0
        self.paid_value =  order_items.aggregate(Sum('paid_value'))['paid_value__sum'] if order_items else 0
        super(Order, self).save(*args, **kwargs)



class OrderItem(models.Model):
    timestamp     = models.DateTimeField(auto_now_add=True)
    user_created  = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='order_item_created')
    user_edited   = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='order_item_edited')
    
    product_related = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order_related = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')

    qty           = models.IntegerField(default=1)
    value         = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    total_value   = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    paid_value    = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    is_paid       = models.BooleanField(default=False)


    def __str__(self):
        return f'Τραπέζι {self.order_related.table_related.title} - Προϊόμ {self.product_related.title}'


    def save(self, *args, **kwargs):
        self.total_value = self.value * self.qty
        super(OrderItem, self).save(*args, **kwargs)
        self.order_related.save()
