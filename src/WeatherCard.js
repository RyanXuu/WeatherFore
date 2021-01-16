import React from 'react';
import sun from './images/sun.png';
import cloud from './images/cloud.png';

const WeatherCard = ({ data }) => {

  const timeBuilder = data => {
    let hour = parseInt(data.dt_txt.slice(11, 13));

    let string;
    if (hour === 12) {
      string = "12 PM";
    }
    else if (hour === 0) {
      string = "12 AM";
    }
    else {
      string = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
    }
    return string;
  }

  const weatherImg = (weather) => {
    switch (weather) {
      case "Clouds":
        return cloud;
      case "Clear":
        return sun;
    }
  }
  return (
    <div>
      <div className="hour">
        {timeBuilder(data)}
      </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(data.main.temp)}°c
        </div>
        <div className="weather">
          <img src={weatherImg(data.weather[0].main)} width="125" height="100" alt={data.weather[0].main} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;