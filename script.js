document.addEventListener("DOMContentLoaded", () => {
	axios.get(
		"https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=gerze",
		{
			headers: {
				authorization: "apikey 1CejPfw1hYhgpjNLCrFJUz:2V0aFWLUzLEd7yOnver5CN",
				"content-type": "application/json",
			},
		}
	)
		.then((response) => {
			console.log(response.data);
			console.log(response.data.result);
			weatherConditions(response.data.result);
			updateHeader(response.data.result[0], response.data.city);

			response.data.result.forEach(day => {
				const status = day.status;
				//console.log(status);
			});

		})
		.catch((error) => {
			console.log(error.response);
		});
})

function updateHeader(dailyWeather, city) {
	const cityelement = document.querySelector(".city");
	const degree = document.querySelector(".degree");
	const weatherDescription = document.querySelector(".weather-description");
	const humidity = document.querySelector(".humidity");
	const image = document.getElementById("image");
	const iconUrl = getWeatherIcon(dailyWeather.status);

	cityelement.textContent = city;
	degree.textContent = dailyWeather.degree + "°";
	weatherDescription.textContent = dailyWeather.description;
	humidity.innerHTML = `<i class="fa-solid fa-droplet icon"></i> ${dailyWeather.humidity}`;
	image.src = iconUrl;

}

function weatherConditions(weatherData) {
	const weatherBody = document.querySelector(".weather-body");
	let weatherHtml = "";

	weatherData.forEach((element) => {
		const iconUrl = getWeatherIcon(element.status);
		console.log(`${element.status} , ${iconUrl}`);
		weatherHtml += `
		<div class="weather">
			<div class="weather-info">
				<div class="day">${element.day}</div>
				<div class="date">${element.date}</div>
			</div>
			<div class="weather-icon-container">
				<img src="${iconUrl}" alt="">
				<div class="weather-body-details">
					<div class="weather-degree">${element.degree}</div>
					<i class="fa-solid fa-droplet icon"></i> ${element.humidity}
				</div>
			</div>
		</div>
		`;
	});
	weatherBody.innerHTML = weatherHtml;
}

function getWeatherIcon(weatherStatus) {
	//console.log("calstı");
	let iconUrl;

	switch (weatherStatus) {
		case "Clouds":
			iconUrl = `./gif/icons8-cloud-64.png`;
			break;
		case "Cloudshot":
			iconUrl = `./gif/icons8-cloudshot-64.png`;
			break;
		case "Night":
			iconUrl = `./gif/icons8-night-64.png`;
			break;
		case "Clear":
			iconUrl = `./gif/icons8-partly-cloudy-day-64.png`;
			break;
		case "Rain":
			iconUrl = `./gif/icons8-rain-64.png`;
			break;
		case "Snow":
			iconUrl = `./gif/icons8-snow-64.png`;
			break;
		case "Storm":
			iconUrl = `./gif/icons8-storm-64.png`;
			break;
		default:
			iconUrl = `./gif/icons8-cloud-64.png`;
			break;
	}
	//console.log(`${weatherStatus} , ${iconUrl}`);
	return iconUrl;
}
