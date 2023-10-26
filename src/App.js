import React, { useState } from "react";
import axios from "axios";

function App() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a5acb752426cd8188485c35694980e3a&units=metric`;
    axios.get(url).then(showWeather);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <button type="submit">Search </button>
    </form>
  );

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>{Math.round(weather.temperature)}°C</li>
          <li>{weather.description}</li>
          <li>{weather.humidity}%</li>
          <li>{weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}

export default App;
