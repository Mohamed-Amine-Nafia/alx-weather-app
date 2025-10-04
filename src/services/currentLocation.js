import axios from "axios";

export async function fetchCurrentLocation(lat, lon) {
  const { data } = await axios.get(
    `https://api-bdc.net/data/reverse-geocode-with-timezone?latitude=${lat}&longitude=${lon}&localityLanguage=en&key=${
      import.meta.env.VITE_LOCATION_TOKEN
    }`
  );
  return {
    city: data.city,
    timeZone: data.timeZone.localTime,
  };
}
