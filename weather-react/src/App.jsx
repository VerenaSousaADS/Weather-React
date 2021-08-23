import React, { useEffect, useState } from "react";
import "./App.css";
// import HelloWorld from './components/Hello'
import { api } from "./services/weather-api";
import {FaTemperatureHigh, FaWind} from 'react-icons/fa'

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  // const city = "Parauapebas";

  async function handleGetWeather(event) {
    event.preventDefault();
    const response = await api.get(search);

    setCity(search);
    console.log(response.data);
    setWeather(response.data);
  }

  useEffect(() => {
    handleGetWeather()
  },[]);

  return (
    <div className="App">
      {/* <h1>{'hello world'.toUpperCase()}</h1>
      <HelloWorld/> */}

      <header>
        <form onSubmit={handleGetWeather}>
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)}/>
          <button>Enviar</button>
        </form>
      </header>

      {weather && (
        <main>
          {/* <p>{JSON.stringify(weather)}</p> */}

          <h1>{city.toUpperCase()}</h1>

          <section className="temp-atual">
            <h2>Clima Atual</h2>

            <p>{weather.temperature}</p>
            <p>{weather.description}</p>
          </section>

          <section className="previsao">
            <h2>Clima nos próximos dias</h2>
            <ol>
              { weather.forecast.map(day => 

                <li>
                  <div>
                    <FaTemperatureHigh/>
                    {/* <p>{weather.forecast[0].temperature}</p> */}
                    <p>{day.temperature}</p>
                  </div>

                  <div>
                    <FaWind/>
                    {/* <p>{weather.forecast[0].wind}</p> */}
                    <p>{day.wind}</p>

                  </div>
                </li>
              
              )

              }
            {/* <h3>Amanhã</h3> */}

              </ol>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
