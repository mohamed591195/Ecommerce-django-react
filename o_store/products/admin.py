from django.contrib import admin
from .models import Product, Category, ProductImage

admin.site.register(ProductImage)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name', )}


@admin.register(Product)
class ProducAdmin(admin.ModelAdmin):
    list_display = ['name', 'inventory', 'price']
    prepopulated_fields = {'slug': ('name',)}
