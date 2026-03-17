require("dotenv").config();
const API_KEY = process.env.API_KEY;
const path = require("path");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "pages")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/mainPage.html"));
});

app.post("/getWeather", async (req, res) => {
  const city = req.body.city;
  const weatherEmoji = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
  };
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    const res_json = await resp.json();

    const res_obj = {
      weather: res_json.weather[0].main,
      weather_desc: res_json.weather[0].description,
      temperature: res_json.main.temp,
      feels_like: res_json.main.feels_like,
      temp_min: res_json.main.temp_min,
      temp_max: res_json.main.temp_max,
      pressure: res_json.main.pressure,
      emoji: weatherEmoji[res_json.weather[0].main] || "❓",
    };

    res.json(res_obj);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error fetching weather OR emoji");
  }
});

app.post("/getWeatherBare", async (req, res) => {
  const city = req.body.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    const res_json = await resp.json();

    res.json(res_json);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error fetching weather");
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
