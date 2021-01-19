import Report from './Report';
import React, { useState } from 'react';
import title from './images/cloudfutures.png';

const api = {
  key: "24a05065d6a6a1fcdaaa35c2516f9e77",
  base: "https://api.openweathermap.org/data/2.5/"
};

const googleAPI = {
  key: "AIzaSyBe8rytPb1dTxpK6YWhrBfnKsdrgYhWxrI",
  base: "https://maps.googleapis.com/maps/api/geocode/"
};

const App = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [newWeather, setnewWeather] = useState({});
  const [coords, setCoords] = useState({});

  const search = (evt) => {


    if (evt.key === "Enter") {
      getCoords(query);
      getWeatherData();

      // let lon = newWeather.results[0].geometry.location.lng;

      fetch(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });

      // 
      //   .then(res => res.json())
      //   .then(result => {
      //     console.log(result);
      //   });
    }
  }
  const getCoords = async (query) => {
    const response = await fetch(`${googleAPI.base}json?address=${query.replace(" ", "+")}&key=${googleAPI.key}`);
    const data = await response.json();
    setCoords(data);
  }

  const getWeatherData = async () => {
    const lat = await fetch(newWeather.results[0].geometry.location.lng);
    const lon = await fetch(newWeather.results[0].geometry.location.lon);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=24a05065d6a6a1fcdaaa35c2516f9e77`);
    const data = await response.json();
    setnewWeather(data);
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const timeBuilder = (d) => {
    let hour = d.getHours();
    let minute = d.getMinutes();

    let ampm;
    if (hour === 12) {
      ampm = "PM";
    }
    else if (hour === 0) {
      hour = 12;
      ampm = "AM";
    }
    else {
      ampm = hour > 12 ? "PM" : "AM";
      if (hour > 12) {
        hour = hour % 12;
      }
    }

    let timeString = minute < 10 ?
      `Retrieved ${hour}:0${minute} ${ampm}`
      : `Retrieved ${hour}:${minute} ${ampm}`;

    return timeString;
  }

  return (
    <div className="app">
      <main>

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="title">
          <img src={title} />
        </div>

        {(typeof weather.list != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.city.name}, {weather.city.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="time">{timeBuilder(new Date())}</div>
            </div>

            <Report weatherData={weather} />

          </div>
        ) : ('')}

      </main>
    </div>
  );
}

export default App;
