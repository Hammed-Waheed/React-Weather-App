import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	console.log(process.env);

	const [inputValue, setInputValue] = useState("frankfurt");

	const [weather, setWeather] = useState({
		feels_like: 23,
		icon: "10d",
		temp: 24,
		pressure: 1002,
		min_temp: 21,
		max_temp: 27,
		city: "berlin",
		humidity: 55,
	});

	const getWeatherInfo = () => {
		console.log(inputValue);

		//SEND REQUEST TO EXTERNAL API USE FETCH METHOD
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
		)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (result.cod !== 200) {
					alert(result.message);
				} else {
					setWeather({
						feels_like: result.main.feels_like,
						icon: result.weather[0].icon,
						temp: result.main.temp,
						pressure: result.main.pressure,
						min_temp: result.main.temp_min,
						max_temp: result.main.temp_max,
						city: result.name,
						humidity: result.main.humidity,
					});
				}
			});
	};

	// useEffect(()=>{} , [])
	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=frankfurt&appid=${process.env.REACT_APP_API_KEY}&units=metric`
		)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (result.cod !== 200) {
					alert(result.message);
				} else {
					setWeather({
						feels_like: result.main.feels_like,
						icon: result.weather[0].icon,
						temp: result.main.temp,
						pressure: result.main.pressure,
						min_temp: result.main.temp_min,
						max_temp: result.main.temp_max,
						city: result.name,
						humidity: result.main.humidity,
					});
				}
			});
	}, []);

	console.log("render.....");

	const getInputValue = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="App">
			<h1>Weather App</h1>

			<div>
				<input type="text" onChange={getInputValue} />
				<button onClick={getWeatherInfo}>Get weather data</button>
			</div>

			<div className="weather-container">
				<div className="left line">
					<h2>feels like {weather.feels_like}°C</h2>
					<h3>{weather.city} </h3>
					<img
						src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
						alt=""
					/>
				</div>
				<div className="right border">
					<h1>{weather.temp}°C </h1>
					<img
						src="https://icon-library.com/images/weather-app-icon/weather-app-icon-7.jpg"
						width="80"
						alt=""
					/>
					<h2>{weather.humidity}%</h2>
					<h2>Pressure: {weather.pressure} </h2>
					<h2>Min Temp: {weather.min_temp}°C </h2>
					<h2>Max Temp: {weather.max_temp}°C </h2>
				</div>
			</div>
		</div>
	);
}

export default App;
