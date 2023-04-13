/* eslint-disable no-undef */
import './App.css';
import Currentweather from './Component/Current/Current-weather';
import Search from './Component/Search/Search';
import { WEATHER_API_URL, WEATHER_API_KEY } from './Api'
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  
  const handleOnSearchChange = (searchData) => {
    const [ lat, lon ] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();

      setCurrentWeather({ city: searchData.label , ...weatherResponse});
      setForecast({ city: searchData.label, ...forecastResponse})
    })
    .catch((err) => console.log(err));
  }


  return (
    <div className="Container">
      <Search 
      onSearchChange={handleOnSearchChange}
      />
      <h1 className='H1'>WELCOME, Stay prepared with our accurate weather updates</h1>
      {currentWeather && <Currentweather data={currentWeather}/>}

    </div>
  );
}

export default App;
