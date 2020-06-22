from django.urls import path, include
from . import views

urlpatterns = [
    path('products/', views.ListProducts.as_view()),
    path('products/<slug:category_slug>/', views.ListProducts.as_view()),
    path('categories/', views.ListCategories.as_view()),
]
