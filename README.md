# 🌦️ Django Weather App

A weather application built with **Django** (backend) and **HTML templates** (frontend), powered by the OpenWeatherMap API.


## ✨ Features
- Real-time weather data (temperature, humidity, wind speed, conditions)
- Search by city name
- Responsive design for all devices
- Error handling for invalid inputs/API failures
- Dockerized for easy deployment

## 🖥️ Tech Stack

- **Backend:** Django (Python)
- **Frontend:** HTML, CSS (Django Templates)
- **API:** [OpenWeatherMap API](https://openweathermap.org/api)
- **Containerization:** Docker

## 🛠️ Setup

### Prerequisites
- Python 3.6+
- Django 3.0+
- [OpenWeatherMap API Key](https://openweathermap.org/api) (free tier)

### Installation
1. Clone the repo:
    ```bash
    git clone https://github.com/Mohammad-Subhan/Weather-Application-using-Python-and-Javascript.git
    cd Weather-Application-using-Python-and-Javascript/WeatherApp
    ```

2. Add your OpenWeatherMap API Key. Create a .env file and add
    ```bash
    WEATHER_API_KEY=your_api_key
    ```

3. Create the virtual environment and install dependencies:
    ```bash
    python -m venv .venv
    .venv/Scripts/activate
    pip install -r requirements.txt
    ```

    Run the server

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver
    ```

    --- OR ---

    Run with Docker
    ```bash
    docker build -t weatherapp .
    docker run -p 8000:8000 weatherapp
    ```
    Open your browser and visit: http://localhost:8000


## 📁 Project Structure
```bash
Weather-Application-using-Python-and-Javascript/
│
├── WeatherApp/
│   ├── app/
│   ├── WeatherApp/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   └── .env
├── README.md
└── .gitignore
```

## 📄 License
This project is licensed under the MIT License.