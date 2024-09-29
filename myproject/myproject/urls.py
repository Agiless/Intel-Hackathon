from django.contrib import admin
from django.urls import path, include  # Add include
from django.http import HttpResponse

def homepage(request):
    return HttpResponse("Welcome to the homepage!")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
      path('', homepage, name='homepage')  # Include your api/urls.py
]