async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '21db32bae99a47d88b8195425252301';  // Вставленный API ключ
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ru`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('city-name').innerText = data.location.name;
        document.getElementById('temperature').innerText = data.current.temp_c;
        document.getElementById('feelslike').innerText = data.current.feelslike_c;
        document.getElementById('condition').innerText = data.current.condition.text;
        document.getElementById('wind').innerText = data.current.wind_kph;
        document.getElementById('humidity').innerText = data.current.humidity;
        document.getElementById('pressure').innerText = data.current.pressure_mb;
        document.getElementById('cloudiness').innerText = data.current.cloud;

        document.getElementById('weather-info').classList.remove('hidden');
    } else {
        alert('Не удалось получить данные о погоде');
    }
}
