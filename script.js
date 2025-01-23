const apiKey = '21db32bae99a47d88b8195425252301';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getCities() {
    const query = document.getElementById('city').value;
    if (query.length < 3) return; // Стартуем запрос после 3 символов

    fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=5&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const suggestions = data.list.map(city => `<li onclick="getWeather('${city.name}')">${city.name}, ${city.sys.country}</li>`).join('');
            document.getElementById('suggestions').innerHTML = suggestions;
        });
}

function getWeather(city) {
    fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('temp').innerText = `Температура: ${data.main.temp}°C`;
            document.getElementById('feelsLike').innerText = `Ощущается как: ${data.main.feels_like}°C`;
            document.getElementById('description').innerText = `Погода: ${data.weather[0].description}`;
        });
}
