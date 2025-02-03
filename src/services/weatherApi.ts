const base = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_API_KEY;
const params = {
  q: "London",
  appid: apiKey,
  units: "metric",
};
const url = new URL(base);
url.search = new URLSearchParams(params).toString();

export async function fetchWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data as OpenWeatherMapData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
