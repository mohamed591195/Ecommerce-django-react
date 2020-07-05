from rest_framework import serializers
from products.models import Product, Category, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    num_products = serializers.IntegerField(
        source='products.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'num_products']


class ProductImageURLField(serializers.RelatedField):

    def to_representation(self, value):
        return f'/{value.img.url}'


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageURLField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'inventory',
            'price',
            'images'
        ]
