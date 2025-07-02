from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.blog_list, name='list'),
    path('<int:pk>/', views.blog_detail, name='detail'),
]