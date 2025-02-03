import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./services/weatherApi";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 1000 * 60 * 20, // 20 minutes
    refetchInterval: 1000 * 60 * 20, // 20 minutes
  });

  console.log(data);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <header className="h-20 flex justify-center items-center">
        <h2 className="text-lg md:text-2xl font-bold">WeatherView</h2>
      </header>
      <main className="flex-grow">
        {isLoading ? (
          <div>Loading... </div>
        ) : (
          <div className="">
            <div className="">
              {data?.weather.map((w) => (
                <div key={w.id} className="">
                  <div className="text-sm">{w.description}</div>
                  <img
                    src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="">{data?.name}</div>
            <div className="text-4xl font-semibold">
              {data?.main?.temp} &deg;C
            </div>
            <div className="text-sm">
              Feels like {data?.main?.feels_like} &deg;C
            </div>
            <div className="">Humidity {data?.main.humidity}</div>
          </div>
        )}
        {isError && <div>Something went wrong</div>}
      </main>
    </div>
  );
}

export default App;
