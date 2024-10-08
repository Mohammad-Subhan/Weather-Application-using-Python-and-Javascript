from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("weather/<str:city>", views.weather, name="weather"),
]
