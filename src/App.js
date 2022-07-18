import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { Weather_Api_Url, Weather_Api_Key, Forecast_Api_Key } from './api'
import { useState } from 'react';

function App() {

  //create hooks
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${Weather_Api_Url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_Api_Key}`);

    const weatherForecastFetch = fetch(`${Weather_Api_Url}/forecast?lat=${lat}&lon=${lon}&appid=${Forecast_Api_Key}`);

    Promise.all([currentWeatherFetch, weatherForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        //creates array with the information from our api fetch and we use the spread operator to combine the search information
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

      })
      //catch error 
      .catch((err) => console.log(err));

  }

  console.log(currentWeather); 
  console.log(forecast); 
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}


    </div>
  );
}

export default App;
