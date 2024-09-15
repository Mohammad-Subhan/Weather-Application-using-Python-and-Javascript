from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from dotenv import load_dotenv
import os


# Create your views here.
def index(request):
    if request.method == "POST":
        city = request.POST["city"]

        return HttpResponseRedirect(reverse("weather", kwargs={"city": city}))
    else:
        return render(request, "app/index.html")


def weather(request, city):
    if request.method == "GET":

        load_dotenv()
        # get the api key form the environment
        WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

        print(city)

        return render(
            request,
            "app/weather.html",
            {"city": city, "weather_api_key": WEATHER_API_KEY},
        )
