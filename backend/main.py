from fastapi import FastAPI, HTTPException, Query
from typing import Optional
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def fetch_weather(api_key: str, city: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&APPID={api_key}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data")

def process_weather_data(data):
    if data:
        weather = data["weather"][0]["main"]
        temperature = data["main"]["temp"]
        humidity = data["main"]["humidity"]
        return weather, temperature, humidity
    else:
        raise HTTPException(status_code=500, detail="Failed to process weather data")

@app.get("/weather")
def get_weather(city: str = Query(..., description="Name of the city"), api_key: Optional[str] = None):
    if not api_key:
        raise HTTPException(status_code=500, detail="API key is required")

    weather_data = fetch_weather(api_key, city)
    weather, temperature, humidity = process_weather_data(weather_data)

    return {
        "city": city,
        "weather": weather,
        "temperature": temperature,
        "humidity": humidity
    }
