function WeatherDetails() {
  return (
    <div className="flex flex-col h-2/3 lg:h-1/2 border-b-1 border-white text-white py-2">
      <h4 className="text-white mb-3 pb-2  border-b-1">Weather Details</h4>
      <div className="my-2 flex justify-between">
        <span>Cloudy</span>
        <span>89%</span>
      </div>
      <div className="my-2 flex justify-between">
        <span>Humidity</span>
        <span>50%</span>
      </div>
      <div className="my-2 flex justify-between ">
        <span>Wind</span>
        <span>1.6km/h</span>
      </div>
      <div className="my-2 flex justify-between">
        <span>Rain</span>
        <span>08mm</span>
      </div>
      <div className="my-2 flex justify-between">
        <span>Description</span>
        <span> Scattred Clouds</span>
      </div>
    </div>
  );
}
export default WeatherDetails;
