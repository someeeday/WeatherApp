// API ключ и базовый URL для WeatherAPI
const apiKey = '21db32bae99a47d88b8195425252301';
const baseUrl = 'https://api.weatherapi.com/v1/current.json';

// Получаем элементы DOM
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const refreshButton = document.getElementById('refreshButton');

// Функция для получения погоды по координатам
async function getWeather(lat, lon) {
    try {
        const url = `${baseUrl}?key=${apiKey}&q=${lat},${lon}&lang=ru`;
        console.log(`Запрос: ${url}`);

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const location = data.location.name || 'Неизвестное место';
            const temperature = Math.round(data.current.temp_c);
            const description = data.current.condition.text;

            locationElement.textContent = `📍 ${location}`;
            temperatureElement.textContent = `${temperature}°C`;
            descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
        } else {
            throw new Error(`Ошибка API: ${data.error.message}`);
        }
    } catch (error) {
        console.error('Ошибка получения данных:', error);
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
                console.log(`Широта: ${lat}, Долгота: ${lon}`);
                getWeather(lat, lon);
            },
            (error) => {
                console.error('Ошибка геолокации:', error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        locationElement.textContent = 'Разрешите доступ к местоположению';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationElement.textContent = 'Местоположение недоступно';
                        break;
                    case error.TIMEOUT:
                        locationElement.textContent = 'Истекло время ожидания';
                        break;
                    default:
                        locationElement.textContent = 'Ошибка определения местоположения';
                }
            }
        );
    } else {
        locationElement.textContent = 'Геолокация не поддерживается вашим браузером';
    }
}

// Обработчик кнопки "Обновить"
refreshButton.addEventListener('click', getLocation);

// Проверка загрузки Telegram WebApp
document.addEventListener('DOMContentLoaded', () => {
    if (window.Telegram) {
        Telegram.WebApp.ready();
        getLocation();
    } else {
        console.error('Telegram WebApp не загружен');
        locationElement.textContent = 'Ошибка загрузки Telegram WebApp';
    }
});
