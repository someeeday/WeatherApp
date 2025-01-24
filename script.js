// API ключ и базовый URL
const apiKey = '21db32bae99a47d88b8195425252301';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Элементы DOM
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const refreshButton = document.getElementById('refreshButton');

// Функция для получения погоды по координатам
async function getWeather(lat, lon) {
    try {
        const url = `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const location = data.name;
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;

            locationElement.textContent = `📍 ${location}`;
            temperatureElement.textContent = `${temperature}°C`;
            descriptionElement.textContent = description;
        } else {
            throw new Error('Не удалось получить данные о погоде');
        }
    } catch (error) {
        console.error(error);
        locationElement.textContent = 'Ошибка при получении данных';
        temperatureElement.textContent = '--°C';
        descriptionElement.textContent = '--';
    }
}

// Функция для получения геолокации
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeather(lat, lon);
            },
            (error) => {
                console.error(error);
                locationElement.textContent = 'Не удалось получить ваше местоположение';
            }
        );
    } else {
        locationElement.textContent = 'Геолокация не поддерживается вашим браузером';
    }
}

// Обработчик кнопки "Обновить"
refreshButton.addEventListener('click', getLocation);

// Инициализация приложения
Telegram.WebApp.ready();
getLocation();
