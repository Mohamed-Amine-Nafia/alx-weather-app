import axios from "axios";

export async function fetchWeatherData(city) {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${
      import.meta.env.VITE_WEATHER_TOKEN
    }`
  );
  return data;
}
