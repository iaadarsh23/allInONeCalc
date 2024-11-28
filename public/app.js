// let url = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=28.7041&lon=77.1025&appid=569e019ea0880c8c2b20220ac28d1fe7';

async function get() {
    try {
        let response = await fetch(url);

        // Check if the response is not ok
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        let data = await response.json();
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

get();
