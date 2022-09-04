from django.urls import path
from .views import getData, getPost
urlpatterns = [
    path('posts/', getData),
    path('posts/<str:code>/', getPost, name='code'),
]
