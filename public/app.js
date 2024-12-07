const allTabs = document.querySelectorAll(".tab");
const userTab = document.querySelector("[user-tab]");
const searchTab = document.querySelector("[search-tab]");
const searchForm = document.querySelector("[search-form]");
const grantLocation = document.querySelector("[grant-location]");
const weatherDesc = document.querySelector("[weather-detail]");
const loader = document.querySelector("[loading]");
//const api = "569e019ea0880c8c2b20220ac28d1fe7";

// Function to show location based on latitude and longitude
function showLoc(position) {
	let coordinates = {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
	};

	async function Loc() {
		//making the grant location ui invisible
		grantLocation.classList.remove("active");
		//make the loader visible
		loader.classList.add("active");

		try {
			let response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api}`
			);
			if (!response.ok) {
				throw new Error("Network issue", response.status);
			}
			let data = await response.json();
			console.log(data);
			//api call  mardi ab loader ko hta denge hum
			loader.classList.remove("active");
			weatherDesc.classList.add("active");
			show(data);
		} catch (error) {
			console.log("error", error.message);
		}
	}
	Loc();
}

// Function to get weather data based on city name
async function weather(city) {
	try {
		let response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
		);

		if (!response.ok) {
			throw new Error(`Network issue! Status: ${response.status}`);
		}

		let data1 = await response.json();

		console.log(data1);

		show(data1);
	} catch (error) {
		console.error(`Cannot access weather data: ${error.message}`);
	}
}

// Function to display weather data
function show(value) {
	const cityname = document.querySelector("[city-name]");
	const countryFlag = document.querySelector("[flag]");
	const weatherDescription = document.querySelector("[weather-description]");
	const weatherImage = document.querySelector("[weather-image]");
	const temperature = document.querySelector("[temp]");
	const windSpeed = document.querySelector("[wind-speed]");
	const humidityData = document.querySelector("[humidity-data]");
	const cloudData = document.querySelector("[cloud-data]");

	cityname.innerHTML = `${value.name}`;
	countryFlag.innerHTML = `${value.sys.country}`;
	weatherDescription.innerHTML = `${value.weather[0].description}`;
	temperature.innerHTML = `${(value.main.temp - 273.15).toFixed(2)} °C`;
	windSpeed.innerHTML = `${value.wind.speed}m/s`;
	humidityData.innerHTML = `${value.main.humidity}%`;
	cloudData.innerHTML = `${value.clouds.all}%`;
	// weatherDesc.innerHTML = `

	// <p>Weather Data</p>
	// <ul>
	//     <li>City name: </li>
	//     <li>Temperature: ${</li>
	//     <li>Humidity: ${}%</li>
	//     <li>Wind Speed: ${} m/s</li>
	//     <li>Weather: ${}</li>
	//     <li>Country: ${}</li>
	// </ul>
	// `;
}

// Event listener for search button
document.getElementById("srch").addEventListener("click", (event) => {
	event.preventDefault();
	const city = document.getElementById("int").value.trim();
	weather(city);
});

// Function to get location data using geolocation API
function myloc() {
	const result = document.getElementById("js-result");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showLoc);
	} else {
		result.innerHTML = "Cannot access";
	}
}

// Event listener for location button
const result = document.getElementById("js-result");
result.addEventListener("click", () => {
	myloc();
});

// Tab switching logic
let oldTab = userTab;

oldTab.classList.add("current-tab");

allTabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		switchTab(tab);
	});
});

function switchTab(newTab) {
	if (newTab != oldTab) {
		oldTab.classList.remove("current-tab");
		oldTab = newTab;
		oldTab.classList.add("current-tab");

		if (!searchForm.classList.contains("active")) {
			weatherDesc.classList.remove("active");
			searchForm.classList.add("active");
		} else {
			searchForm.classList.remove("active");
			weatherDesc.classList.remove("active");

			getfromSessionStorage();
		}
	}
}

userTab.addEventListener("click", () => {
	myloc();
});

// Function to check coordinates in session storage
function getfromSessionStorage() {
	const localCoordinates = sessionStorage.getItem("user-coordinates");
	if (!localCoordinates) {
		grantLocation.classList.add("active");
	} else {
		let coordinates = JSON.parse(localCoordinates);
		showLoc({ coords: coordinates });
	}
}
