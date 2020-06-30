from django.urls import path, include
from . import views

urlpatterns = [
    path('products/', views.ListProducts.as_view()),
    path('products/<slug:category_slug>/', views.ListProducts.as_view()),
    path('products_by_ids/', views.ListProductsByIds.as_view()),
    path('product/<slug>/', views.DetailProduct.as_view(), name='product_detail'),
    path('categories/', views.ListCategories.as_view()),

]
