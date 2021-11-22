import React, { useState } from 'react';
import Ccomponent from './Ccomponent';

const api = {
  key: "ab92852ba68368874264bc6eea2e9a3f",
  base: "https://api.openweathermap.org/data/2.5/",
};


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [name, setName] = useState("");
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(result => result.json()).then(results => {
          setWeather(results);
          setQuery('');
          setName("app");
        })
    }
  }

  return (
    <div className={(weather.main) && weather.main.temp < 18 ? (name) : ("")} id="background">
    <div className={(weather.main) && weather.main.temp > 18 ? (name + " warm") : ("")} id="background">
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {
          (typeof weather.main != "undefined") ? (

            <div>
              <div className="location-box">
                <div className="location">{weather.name}. {weather.sys.country}</div>
                <div className="date">{new Date().toDateString()}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].description}, wind: {Math.round(weather.wind.speed)}ms</div>
              </div>

            </div>
          )

            :

          ( 
            <div>
              <h1>{weather.message}</h1>
              <Ccomponent />
            </div>
          )

        }
      </main>
    </div>
    </div>
  );
}

export default App;
