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
  const [weather, setWeather] = useState([]);
  const [google, setGoogle] = useState({}); 

  const search = async (evt) => {

    if (evt.key === "Enter") {

      // Get the google geocoding response and create variables for lat/lon
      const googleResponse = await fetch(`${googleAPI.base}json?address=${query.replace(" ", "+")}&key=${googleAPI.key}`)
      const googleData = await googleResponse.json();
      setGoogle(googleData);
      console.log(googleData);
      const lat = googleData.results[0].geometry.location.lat;
      const lon = googleData.results[0].geometry.location.lng;

      // Get openweathermap response
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=24a05065d6a6a1fcdaaa35c2516f9e77`);
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
      setWeather(weatherData.daily);
      const thing = weatherData;
      // console.log(thing.daily[0].clouds);
      setQuery('');
    }
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

        {(typeof google.results != "undefined") ? (
          <div>

            <div className="location-box">
              <div className="location">{google.results[0].formatted_address}</div>
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
