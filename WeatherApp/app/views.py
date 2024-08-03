from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
import requests


# Create your views here.
def index(request):
    if request.method == "POST":
        city = request.POST["city"]

        return HttpResponseRedirect(reverse("weather", kwargs={
            "city": city
        }))
    else:
        return render(request, "app/index.html")


def weather(request, city):
    if request.method == "GET":
        print(city)
        return render(request, "app/weather.html", {
            "city": city
        })
