import fetch from "node-fetch";

const endpoint = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a42c2709196635074c089d59efebd744";
async function fetchWeather() {
  try {
    const response = await fetch("http://localhost:3000/weather");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  const weatherHTML = `
    <p>City: ${data.city.name}</p>
    <p>Temperature: ${(data.list[0].main.temp - 273.15).toFixed(2)}°C</p>
    <p>Weather: ${data.list[0].weather[0].description}</p>
  `;
  weatherDiv.innerHTML = weatherHTML;
}

fetchWeather();
