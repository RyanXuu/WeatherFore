import React from 'react';
import WeatherCard from './WeatherCard';

const Report = ({ weatherData }) => {

  return (
    <div className="report">
      <div className="card">
        <WeatherCard data={weatherData.list[0]} />
      </div>
      <div className="card">
        <WeatherCard data={weatherData.list[1]} />
      </div>
      <div className="card">
        <WeatherCard data={weatherData.list[2]} />
      </div>
      <div className="card">
        <WeatherCard data={weatherData.list[3]} />
      </div>
      <div className="card">
        <WeatherCard data={weatherData.list[4]} />
      </div>
    </div>
  );
};

export default Report;