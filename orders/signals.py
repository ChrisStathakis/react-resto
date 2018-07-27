from .models import OrderItem
from django.db.models.signals import post_delete
from django.dispatch import receiver


@receiver(post_delete, sender=OrderItem)
def delete_order_item(sender, instance, **kwargs):
    order = instance.order_related
    order.save()