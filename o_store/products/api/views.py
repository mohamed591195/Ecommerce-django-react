from rest_framework.generics import ListAPIView
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.pagination import PageNumberPagination
from products.models import Category, Product
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework.response import Response


class ListCategories(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ProductsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'


class ListProducts(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductsSetPagination

    def get_queryset(self):

        if 'category_slug' in self.kwargs:

            category = Category.objects.get(
                slug=self.kwargs.get('category_slug'))

            return Product.objects.filter(category=category)

        if 'query' in self.request.GET:
            query = self.request.GET.get('query', '')

            if query:

                return Product.objects.filter(
                    Q(name__icontains=query) |
                    Q(description__icontains=query) |
                    Q(category__name__icontains=query)
                )

        return Product.objects.all()
