from django.contrib import admin

# Register your models here.
from .models import Product, Developer

admin.site.register(Product)
admin.site.register(Developer)
