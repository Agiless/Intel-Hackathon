# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='product-list'),
    path('create-product/', views.create_product, name='create-product'),
]
