import NotificationMessage from "./components/NotificationMessage";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SuggestedCity from "./components/SuggestedCity";
import WeatherDetails from "./components/WeatherDetails";
import { useInput } from "./store/useInput";
import { useNotification } from "./store/useNotification";
import { fetchWeatherData } from "./services/weatherData";
import { fetchCurrentLocation } from "./services/currentLocation";
import { DataContext } from "./context/dataContext";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import { useNotFound } from "./store/useNotFound";

function App() {
  const [weatherData, setWeatherData] = useState();
  const { inputValue, setInputValue } = useInput();
  const { Notification, setNotification } = useNotification();
  const [isLoading, setLoading] = useState(false);
  const { isNotFound, setNotFound } = useNotFound();
  const backgrounds = {
    Rain: "bg-[url(./assets/rainy.webp)]",
    Drizzle: "bg-[url(./assets/rainy.webp)]",
    Clear: "bg-[url(./assets/clear.webp)]",
    Clouds: "bg-[url(./assets/cloudy.jpg)]",
    Snow: "bg-[url(./assets/snowy.webp)]",
    Mist: "bg-[url(./assets/misty.webp)]",
    Haze: "bg-[url(./assets/haze.webp)]",
    Squall: "bg-[url(./assets/squall.webp)]",
    Thunderstorm: "bg-[url(./assets/thunder.webp)]",
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        if (lat && lon) {
          const { city, timeZone } = await fetchCurrentLocation(lat, lon);
          const data = await fetchWeatherData(city);
          setWeatherData({ ...data, timeZone: timeZone });
        }
      });
    }
  }, []);

  async function getData(city) {
    if (!inputValue && !city) {
      setNotification(true);
      return;
    }
    setLoading(true);
    try {
      const { timeZone } = await fetchCurrentLocation(city);
      const data = await fetchWeatherData(city || inputValue);
      setTimeout(() => {
        if (data) {
          setWeatherData({
            ...data,
            timeZone: timeZone,
          });
          setInputValue("");
          setLoading(false);
        }
      }, 1500);
    } catch (err) {
      setNotFound(true);
      setLoading(false);
      setInputValue("");
      console.error("Error fetching weather:", err);
    }
  }

  const checker = weatherData ? weatherData.weather[0].main : "Clear";

  return (
    <DataContext.Provider value={{ weatherData, getData }}>
      {isLoading && <Loading />}
      <div className="relative w-screen sm:min-h-screen lg:h-screen bg-[#242424] flex justify-center items-center lg:overflow-hidden font-poppins">
        <div
          className={`flex lg:h-3/4 md:h-screen md:w-screen  lg:w-3/4 bg-cover bg-center bg-no-repeat ${backgrounds[checker]} flex-col w-full h-full lg:flex-row lg:drop-shadow-2xl/70`}
        >
          <div className="lg:h-full lg:w-3/5 flex flex-col lg:p-12 text-white lg:justify-between p-6">
            <h1 className="lg:text-md font-medium  text-xl">Weather</h1>
            <div className="flex items-center gap-1  my-6 bg-black/10 p-3 backdrop-blur-lg">
              <h2 className="lg:text-8xl font-semibold  text-6xl ">
                {weatherData ? Math.round(weatherData.main.temp) : null}°
              </h2>
              <div className="ml-4 whitespace-nowrap">
                <h3 className="lg:text-2xl font-medium text-xl">
                  {weatherData ? weatherData.name : null}
                </h3>
                <span className="lg:text-sm text-xs">
                  {weatherData
                    ? new Date(weatherData.timeZone).toLocaleString()
                    : null}
                </span>
              </div>
              <div className="flex h-fit">
                <img
                  className="lg:w-26 w-32 h-auto"
                  src={
                    weatherData
                      ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
                      : null
                  }
                  alt={weatherData ? weatherData.weather[0].description : null}
                />
              </div>
            </div>
          </div>
          <div className="lg:h-full h-3/4 lg:w-2/5 bg-black/10 lg:p-10 mx-6 lg:mx-0 p-4  backdrop-blur-lg flex flex-col justify-between">
            <SearchBar />
            <SuggestedCity />
            <WeatherDetails />
          </div>
        </div>
        {Notification && <NotificationMessage />}
        {isNotFound && <NotFound />}
      </div>
    </DataContext.Provider>
  );
}

export default App;
