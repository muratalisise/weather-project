const cityDom = document.getElementById('city');
const districtDom = document.getElementById('district');

document.addEventListener("DOMContentLoaded", async () => {
	const weather = (await axios.get("https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=gerze", {
		headers: {
			authorization: "apikey 1CejPfw1hYhgpjNLCrFJUz:2V0aFWLUzLEd7yOnver5CN",
			"content-type": "application/json",
		},
	})).data.result;

	weatherConditions(weather)

	const cities = (await axios.get("https://api.kadircolak.com/Konum/JSON/API/ShowAllCity")).data;

	let citiesOptionsString = '<option value="" disabled>İl Seçiniz</option>';
	for (let i = 0; i < cities.length; i++) {
		citiesOptionsString += `<option value="${cities[i].ID}">${cities[i].TEXT}</option>`;
	}

	cityDom.innerHTML = citiesOptionsString;
	cityDom.value = 57;

	let districtsResponse = await axios.get(`https://api.kadircolak.com/Konum/JSON/API/ShowDistrict?plate=${cityDom.value}`);
	const districts = districtsResponse.data;

	let districtsOptionsString = '<option value="" disabled>İlçe Seçiniz</option>';
	for (let i = 0; i < districts.length; i++) {
		districtsOptionsString += `<option value="${districts[i].DISTRICT}">${districts[i].DISTRICT}</option>`;
	}
	districtDom.innerHTML = districtsOptionsString;
	districtDom.value = "GERZE";
});

districtDom.onchange = async function () {
	const weatherResponse = await axios.get(`https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${districtDom.value}`, {
		headers: {
			authorization: "apikey 1CejPfw1hYhgpjNLCrFJUz:2V0aFWLUzLEd7yOnver5CN",
			"content-type": "application/json",
		},
	});
	const weather = weatherResponse.data.result;

	if (weather === undefined) {
		alert("Seçilen bölgenin hava durumu verisi bulunamadı...");
		return;
	}
	weatherConditions(weather)
}

cityDom.onchange = async () => {
	districtDom.innerHTML = '<option value="">İlçe Seçiniz</option>';

	let districtsResponse = await axios.get(`https://api.kadircolak.com/Konum/JSON/API/ShowDistrict?plate=${cityDom.value}`);
	const districts = districtsResponse.data;

	let districtsOptionsString = '<option value="" disabled>İlçe Seçiniz</option>';
	for (let i = 0; i < districts.length; i++) {
		districtsOptionsString += `<option value="${districts[i].DISTRICT}">${districts[i].DISTRICT}</option>`;
	}
	districtDom.innerHTML = districtsOptionsString;
	districtDom.onchange();
}

function weatherConditions(weatherData) {
	const weatherBody = document.querySelector(".weather-body");
	let weatherHtml = "";

	weatherData.slice(0, 7).forEach((element) => {
		let iconUrl;
		switch (element.status) {
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
		//console.log(`${element.status} , ${iconUrl}`);
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
