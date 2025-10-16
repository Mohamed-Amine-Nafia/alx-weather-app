// Importing custom components and React hooks
import NotificationMessage from "./components/NotificationMessage";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SuggestedCity from "./components/SuggestedCity";
import WeatherDetails from "./components/WeatherDetails";

// Importing custom global state management hooks
import { useInput } from "./store/useInput";
import { useNotification } from "./store/useNotification";
import { useNotFound } from "./store/useNotFound";

// Services for fetching weather and location data
import { fetchWeatherData } from "./services/weatherData";
import { fetchCurrentLocation } from "./services/currentLocation";

// Global context for passing weather data across components
import { DataContext } from "./context/dataContext";

// Utility components
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";

function App() {
  // Local state to hold weather data
  const [weatherData, setWeatherData] = useState();

  // Using global input state
  const { inputValue, setInputValue } = useInput();

  // Using global notification state
  const { Notification, setNotification } = useNotification();

  // State to show loading spinner
  const [isLoading, setLoading] = useState(false);

  // State to handle 404 or not-found results
  const { isNotFound, setNotFound } = useNotFound();

  // Background images mapped to weather types
  const backgrounds = {
    Rain: "bg-[url(./assets/rainy.webp)]",
    Drizzle: "bg-[url(./assets/rainy.webp)]",
    Clear: "bg-[url(./assets/clear.webp)]",
    Clouds: "bg-[url(./assets/cloudy.webp)]",
    Snow: "bg-[url(./assets/snowy.webp)]",
    Mist: "bg-[url(./assets/misty.webp)]",
    Haze: "bg-[url(./assets/haze.webp)]",
    Squall: "bg-[url(./assets/squall.webp)]",
    Thunderstorm: "bg-[url(./assets/thunder.webp)]",
  };

  // On initial load, get user's geolocation and fetch weather data
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        if (lat && lon) {
          // Fetch city and timezone based on coordinates
          const { city, timeZone } = await fetchCurrentLocation(lat, lon);

          // Fetch weather data using city
          const data = await fetchWeatherData(city);

          // Save fetched data in state
          setWeatherData({ ...data, timeZone: timeZone });
        }
      });
    }
  }, []);

  // Function to fetch weather data based on input or selected city
  async function getData(city) {
    if (!inputValue && !city) {
      // Show notification if no input provided
      setNotification(true);
      return;
    }

    setLoading(true); // Show loading spinner

    try {
      // Get timezone of the city
      const { timeZone } = await fetchCurrentLocation(city);

      // Fetch weather data
      const data = await fetchWeatherData(city || inputValue);

      setTimeout(() => {
        if (data) {
          // Set weather data in state
          setWeatherData({
            ...data,
            timeZone: timeZone,
          });

          // Clear input and stop loading
          setInputValue("");
          setLoading(false);
        }
      }, 1500); // Artificial delay for smoother UX
    } catch (err) {
      // Handle not found or API errors
      setNotFound(true);
      setLoading(false);
      setInputValue("");
      console.error("Error fetching weather:", err);
    }
  }

  // Determine which background to use based on current weather
  const checker = weatherData ? weatherData.weather[0].main : "Clear";

  return (
    // Provide weather data and getData function to all children via context
    <DataContext.Provider value={{ weatherData, getData }}>
      {/* Show loading spinner while fetching data */}
      {isLoading && <Loading />}

      <div className="relative w-screen sm:min-h-screen lg:h-screen bg-[#242424] flex justify-center items-center lg:overflow-hidden font-poppins">
        <div
          className={`flex lg:h-3/4 md:h-screen md:w-screen  lg:w-3/4 bg-cover bg-center bg-no-repeat ${backgrounds[checker]} flex-col w-full h-full lg:flex-row lg:drop-shadow-2xl/70`}
        >
          {/* Left section with temperature and city */}
          <div className="lg:h-full lg:w-3/5 flex flex-col lg:p-12 text-white lg:justify-between p-6">
            <h1 className="lg:text-md font-medium  text-xl">Weather</h1>

            {/* Display temperature, city name, local time, and weather icon */}
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

          {/* Right section with search and details */}
          <div className="lg:h-full h-3/4 lg:w-2/5 bg-black/10 lg:p-10 mx-6 lg:mx-0 p-4  backdrop-blur-lg flex flex-col justify-between">
            <SearchBar /> {/* Search bar to input city */}
            <SuggestedCity /> {/* Suggested city buttons */}
            <WeatherDetails /> {/* Detailed weather info */}
          </div>
        </div>

        {/* Conditionally render notification and 404 component */}
        {Notification && <NotificationMessage />}
        {isNotFound && <NotFound />}
      </div>
    </DataContext.Provider>
  );
}

export default App;
