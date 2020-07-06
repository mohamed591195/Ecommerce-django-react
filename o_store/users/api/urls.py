from django.urls import path, include
from knox.views import LogoutView
from users.api import views

urlpatterns = [
    path('login/', views.LoginAPIView.as_view()),
    path('register/', views.RegisterAPIView.as_view()),
    path('user/', views.UserAPIView.as_view()),
    path('logout/', LogoutView.as_view(), name='knox_logout')
]
