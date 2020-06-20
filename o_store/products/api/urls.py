from django.urls import path, include
from . import views

urlpatterns = [
    path('api/', include([
        path('categories/', views.ListCategories.as_view())
    ])),
]
