from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import F, Sum
from django.conf import settings
from products.models import Product

User = get_user_model()
CURRENCY = settings.CURRENCY


class Table(models.Model):
    title = models.CharField(unique=True, max_length=150)
    active = models.BooleanField(default=True)
    is_using = models.BooleanField(default=False)
    user_using = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    ordering = models.IntegerField(default=0, help_text='bigger the better')

    class Meta:
        ordering = ['-ordering',]

    def __str__(self):
        return self.title

    def last_active_table(self):    
        qs_exists = self.orders.filter(active=True, table_related=self)
        if qs_exists.exists():
            return qs_exists.last().id 
        return None


class Order(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    user_created = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='order_created')
    user_edited = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='order_edited')
    active = models.BooleanField(default=True)
    is_paid = models.BooleanField(default=False)

    table_related = models.ForeignKey(Table, on_delete=models.SET_NULL, null=True, related_name='orders')  
    title = models.CharField(blank=True, max_length=200)

    value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    paid_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)

    class Meta:
        ordering = ['-timestamp',]
    
    def __str__(self):
        return f'table {self.table_related} - {self.id}' if self.table_related else f'{self.id}'

    def save(self, *args, **kwargs):
        order_items = self.order_items.all()
        self.value = order_items.aggregate(Sum('total_value'))['total_value__sum'] if order_items else 0
        self.paid_value = order_items.aggregate(Sum('paid_value'))['paid_value__sum'] if order_items else 0
        if self.is_paid:
            self.paid_value = self.value
            if self.order_items:
                self.order_items.all().update(is_paid=True)
        super(Order, self).save(*args, **kwargs)

    def remain_value(self):
        return self.value - self.paid_value

    def tag_order_items(self):
        return self.order_items.all()

    def tag_value(self):
        return f'{self.value} {CURRENCY}'

    def tag_paid_value(self):
        return f'{self.paid_value} {CURRENCY}'

    def tag_remain_value(self):
        return f'{self.remain_value()} {CURRENCY}'    

    def tag_table_related(self):
        return f'{self.table_related.title}' if self.table_related else 'No Table'

    def tag_is_paid(self):
        return 'Is Paid' if self.is_paid else 'No Paid'

    def tag_timestamp(self):
        return self.timestamp.date()


class OrderItem(models.Model):
    timestamp       = models.DateTimeField(auto_now_add=True)
    user_created    = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='order_item_created')
    user_edited     = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='order_item_edited')
    
    product_related = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order_related   = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')

    qty             = models.IntegerField(default=1)
    value           = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    total_value     = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    paid_value      = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    is_paid         = models.BooleanField(default=False)


    def tag_product_related(self):
        return f'{self.product_related.title}' if self.product_related else 'No Product'

    def save(self, *args, **kwargs):
        if self.value < 0.01:
            self.value = self.product_related.value if self.product_related else 0
        self.total_value = self.value * self.qty
        if self.is_paid:
            self.paid_value = self.value
        super(OrderItem, self).save(*args, **kwargs)
        self.order_related.save()

    def tag_value(self):
        return f'{self.value} {CURRENCY}'
    
    def tag_paid_value(self):
        return f'{self.paid_value} {CURRENCY}'

    def tag_remain(self):
        remain = self.value - self.paid_value
        return f'{remain} {CURRENCY}'

    def tag_total_value(self):
        total = self.value * self.qty
        return f'{total} {CURRENCY}'

