import { useContext } from "react";
import { DataContext } from "../context/dataContext";
function SuggestedCity() {
  const { getData } = useContext(DataContext);
  const cities = [
    "London",
    "New York",
    "Hong Kong",
    "Moscow",
    "New Delhi",
    "Rabat",
    "Paris",
  ];
  function handleClick(city) {
    getData(city);
  }
  return (
    <div className="flex flex-wrap gap-x-3 my-2">
      {cities.map((city) => {
        return (
          <span
            onClick={() => handleClick(city)}
            key={city}
            className=" bg-black/10 block w-fit my-2 backdrop-blur-lg text-white py-2 px-3 cursor-pointer hover:scale-105 duration-200 ease-in-out active:bg-white/80 active:text-black"
          >
            {city}
          </span>
        );
      })}
    </div>
  );
}
export default SuggestedCity;
