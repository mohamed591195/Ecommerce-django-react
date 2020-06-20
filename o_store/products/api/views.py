from rest_framework.generics import ListAPIView
from .serializers import CategorySerializer
from products.models import Category


class ListCategories(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
