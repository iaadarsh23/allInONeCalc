let lat='28.7041';
let lon='77.1025';
// let api="569e019ea0880c8c2b20220ac28d1fe7";

async function get() {
    try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api}`);

        // Check if the response is not ok
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);
        let city= data.list[0].main.aqi;
        
       
        // Display data
        const result = document.getElementById("js-result");
        result.innerHTML = ` <p> here is the forcst</p>
         <ul>
            <li>
            AQI: ${city}
            </li>
            <li>
            co: ${data.list[0].components.co}
            </li>
            <li>
            no: ${data.list[0].components.no}
            </li>
            <li>
            o3: ${data.list[0].components.o3}
            </li>

         
         </ul>
            `
            
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

//
async function wether() {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`);
    try {
        // Fetch weather data from the API
        
        
        // Check if the response is not ok
        if (!response.ok) {
            throw new Error(`Network issue! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        let data1 = await response.json();
        console.log(data1);

        // Call a function to display the weather data
        show(data1);

    } catch (error) {
        // Catch and log errors
        console.error(`Cannot access weather data: ${error.message}`);
    }
}

function show(vle){
    let result=document.getElementById("js-result");
    let newPara=document.createElement('p');
    document.body.appendChild(newPara);
    newPara.innerHTML=`

        <p> wethere data</p>
        <ul>
        <li>City name:${vle.name}</li>
        <li>temp:${vle.main.temp} °C</li>
        <li>humid:${vle.main.humidity}%</li>
        <li>Wind Speed: ${vle.wind.speed} m/s</li>
        <li>Weather: ${vle.weather[0].description}</li>
        <li></li>
        </ul>
    
    `
}

