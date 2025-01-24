const apiKey = '21db32bae99a47d88b8195425252301';
const baseUrl = 'https://api.weatherapi.com/v1/current.json';

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const timeElement = document.getElementById('time');
const greetingElement = document.getElementById('greeting');
const searchInput = document.getElementById('city-search');
const searchSuggestions = document.getElementById('search-suggestions');
const favoriteButton = document.getElementById('add-to-favorites');
const favoritesList = document.getElementById('favorites-list');

// Функция для получения времени суток и приветствия
function getGreeting() {
    const hours = new Date().getHours();
    let greeting = '';
    if (hours >= 6 && hours < 12) {
        greeting = 'Доброе утро';
    } else if (hours >= 12 && hours < 18) {
        greeting = 'Добрый день';
    } else {
        greeting = 'Добрый вечер';
    }
    greetingElement.textContent = greeting;
    greetingElement.style.opacity = 1; // Для плавного появления
}

// Функция для отображения времени
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    timeElement.textContent = `Текущее время: ${time}`;
}

// Функция для получения погоды по координатам
async function getWeather(lat, lon) {
    try {
        const url = `${baseUrl}?key=${apiKey}&q=${lat},${lon}&lang=ru`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.current) {
            locationElement.textContent = `📍 ${data.location.name}`;
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            descriptionElement.textContent = data.current.condition.text;
        } else {
            alert('Ошибка при получении данных о погоде');
        }
    } catch (error) {
        console.error('Ошибка получения данных:', error);
        alert('Ошибка при получении данных о погоде');
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
                console.error('Ошибка геолокации:', error);
                alert('Не удалось определить местоположение');
            }
        );
    } else {
        alert('Геолокация не поддерживается вашим браузером');
    }
}

// Функция для получения подсказок по городам
async function getCitySuggestions(query) {
    try {
        const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        searchSuggestions.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.addEventListener('click', () => getWeatherByCity(item.name));
            searchSuggestions.appendChild(li);
        });
    } catch (error) {
        console.error('Ошибка получения подсказок:', error);
    }
}

// Функция для получения погоды по городу из поиска
async function getWeatherByCity(city) {
    try {
        const url = `${baseUrl}?key=${apiKey}&q=${city}&lang=ru`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.current) {
            locationElement.textContent = `📍 ${data.location.name}`;
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            descriptionElement.textContent = data.current.condition.text;
        } else {
            alert('Город не найден');
        }
    } catch (error) {
        console.error('Ошибка получения данных:', error);
        alert('Ошибка при получении данных о погоде');
    }
}

// Функция для добавления города в избранное
function addToFavorites() {
    const city = locationElement.textContent.replace('📍 ', '');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesList();
    }
}

// Функция для обновления списка избранных городов
function updateFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = '';
    favorites.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        listItem.addEventListener('click', () => getWeatherByCity(city));
        favoritesList.appendChild(listItem);
    });
}

// Обработчик ввода в поле поиска
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (query.length >= 3) {
        getCitySuggestions(query);
    } else {
        searchSuggestions.innerHTML = '';
    }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    getGreeting();
    updateTime();
    setInterval(updateTime, 1000);
    updateFavoritesList();
    getLocation();  // Получаем погоду для текущего местоположения
    document.body.classList.add('loaded'); // Для плавного появления
});
