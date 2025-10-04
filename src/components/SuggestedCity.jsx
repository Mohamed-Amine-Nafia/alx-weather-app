function SuggestedCity() {
  const cities = [
    "London",
    "New York",
    "Hong Kong",
    "Moscow",
    "New Delhi",
    "Rabat",
    "Paris",
  ];

  return (
    <div className="flex flex-wrap gap-x-3 my-2">
      {cities.map((city) => {
        return (
          <span
            key={city}
            className=" bg-black/10 block w-fit my-2 backdrop-blur-lg text-white py-2 px-3 cursor-pointer hover:scale-105 duration-200 ease-in-out"
          >
            {city}
          </span>
        );
      })}
    </div>
  );
}
export default SuggestedCity;
