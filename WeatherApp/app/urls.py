from django.urls import path
import views

urlspatterns = [
    path("", views.index, name="index"),
    path("weather/<str:city>", views.weather, name="weather"),
]