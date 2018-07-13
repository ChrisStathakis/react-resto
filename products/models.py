from django.db import models

# Create your models here.



class Category(models.Model):
    title = models.CharField(unique=True, max_length=150)
    ordering = models.IntegerField(default=1)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.title}'


class Product(models.Model):
    active   = models.BooleanField(default=True)
    title    = models.CharField(max_length=150)
    value    = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.title}'

    def tag_category(self):
        return f'{self.category.title}' if self.category else 'No Category'



