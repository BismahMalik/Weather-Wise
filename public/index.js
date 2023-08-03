async function fetchWeatherData() {
    const urlParams = new URLSearchParams(window.location.search);
    const word = urlParams.get("word");
    const enteredWordElement = document.getElementById("word");
    enteredWordElement.textContent = word;

    try {
      const response = await fetch(`/weather?city=${encodeURIComponent(word)}`);
      const weatherData = await response.json();

      if (weatherData && weatherData.cloud_pct !== undefined && weatherData.temp !== undefined &&
          weatherData.feels_like !== undefined && weatherData.humidity !== undefined &&
          weatherData.min_temp !== undefined && weatherData.max_temp !== undefined &&
          weatherData.wind_speed !== undefined && weatherData.wind_degrees !== undefined) {
        document.getElementById("cloud_pct").textContent = weatherData.cloud_pct;
        document.getElementById("temp").textContent = weatherData.temp;
        document.getElementById("feels_like").textContent = weatherData.feels_like;
        document.getElementById("humidity").textContent = weatherData.humidity;
        document.getElementById("min_temp").textContent = weatherData.min_temp;
        document.getElementById("max_temp").textContent = weatherData.max_temp;
        document.getElementById("wind_speed").textContent = weatherData.wind_speed;
        document.getElementById("wind_degrees").textContent = weatherData.wind_degrees;
      } else {
        document.getElementById("result").textContent = "City Not Found";
      }
    } catch (error) {
      console.error(error);
    }
  }
fetchWeatherData();

