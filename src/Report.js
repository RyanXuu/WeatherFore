import React from 'react';
import WeatherCard from './WeatherCard';

const Report = ({ weatherData }) => {

  
  // console.log(weatherData);
  // console.log(weatherData.daily[0].clouds)
  return (
   
    
    <div className="report">
    {/* {weatherData[0].snow} */}
      {/* <div className="card">
        <WeatherCard data={weatherData.daily[0]} />
      </div>
      <div className="card">
        <WeatherCard data={weatherData.daily[1]} />
      </div>
      <div className="card">
        <WeatherCard data={weatherData.daily[2]} />
      </div>
      <div className="card">
        <WeatherCard data={weatherData.daily[3]} />
      </div>
      <div className="card">
        <WeatherCard data={this.weatherData.daily[4]} />
      </div> */}
    </div>
    
  );
};

export default Report;