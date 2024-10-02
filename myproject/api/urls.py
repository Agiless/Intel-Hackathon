# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('create-product/', views.create_product, name='create-product'),
    path('create-shop/',views.create_shop,name="shop")
]
