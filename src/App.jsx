import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <div className="relative w-screen sm:min-h-screen lg:h-screen bg-[#242424] flex justify-center items-center lg:overflow-hidden font-poppins">
      <div
        className={`flex lg:h-3/4  lg:w-3/4 bg-cover bg-center bg-no-repeat bg-[url(./assets/rainy.webp)] flex-col w-full h-full lg:flex-row lg:drop-shadow-2xl/70`}
      >
        <div className="lg:h-full lg:w-3/5 flex flex-col lg:p-12 text-white lg:justify-between p-6">
          <h1 className="lg:text-md font-medium  text-xl">Weather</h1>
          <div className="flex items-center gap-1  my-6 bg-black/10 p-3 backdrop-blur-lg">
            <h2 className="lg:text-9xl text-6xl ">21°</h2>
            <div className="ml-4 whitespace-nowrap">
              <h3 className="lg:text-2xl text-xl">London</h3>
              <span className="lg:text-sm text-xs">19-09-2025</span>
            </div>
            <div className="flex h-fit">
              <img
                className="lg:w-26 w-32 h-auto"
                src="https://placehold.co/10"
                alt="icon"
              />
            </div>
          </div>
        </div>
        <div className="lg:h-full h-3/4 lg:w-2/5 bg-black/10 lg:p-10 p-8  backdrop-blur-lg flex flex-col justify-between">
          <SearchBar />
          <WeatherDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
