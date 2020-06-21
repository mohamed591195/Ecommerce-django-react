from rest_framework.generics import ListAPIView
from .serializers import CategorySerializer, ProductSerializer
from products.models import Category, Product


class ListCategories(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ListProducts(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
