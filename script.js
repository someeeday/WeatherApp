const apiKey = 'YOUR_API_KEY'; // Замените на ваш ключ API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'; // URL OpenWeatherMap API

// Маппинг погодных состояний к изображениям фона
const weatherBackgrounds = {
    'Clear': 'url("clear-sky.jpg")', // картинка для ясного неба
    'Clouds': 'url("cloudy.jpg")', // картинка для облачной погоды
    'Rain': 'url("rainy.jpg")', // картинка для дождя
    'Snow': 'url("snowy.jpg")', // картинка для снега
    'Drizzle': 'url("drizzle.jpg")', // картинка для мороси
    'Thunderstorm': 'url("thunderstorm.jpg")', // картинка для грозы
    'Mist': 'url("mist.jpg")' // картинка для тумана
};

// Функция для получения погоды по городу
async function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Пожалуйста, введите название города!');
        return;
    }

    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Отображаем информацию о погоде
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('temperature').innerText = `${data.main.temp}°C`;
            document.getElementById('feelslike').innerText = `${data.main.feels_like}°C`;
            document.getElementById('condition').innerText = data.weather[0].description;
            document.getElementById('wind').innerText = `${data.wind.speed} м/с`;
            document.getElementById('humidity').innerText = `${data.main.humidity}%`;
            document.getElementById('pressure').innerText = `${data.main.pressure} гПа`;
            document.getElementById('cloudiness').innerText = `${data.clouds.all}%`;

            // Обновляем фон в зависимости от погодных условий
            const weatherCondition = data.weather[0].main;
            document.getElementById('background-image').style.backgroundImage = weatherBackgrounds[weatherCondition] || 'url("default.jpg")';

            // Показываем блок с информацией о погоде
            document.getElementById('weather-info').classList.remove('hidden');
        } else {
            alert('Город не найден!');
        }
    } catch (error) {
        console.error('Ошибка при получении данных погоды:', error);
        alert('Произошла ошибка при получении данных о погоде');
    }
}

// Функция для получения и отображения местоположения пользователя
function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod === 200) {
                    // Отображаем информацию о погоде
                    document.getElementById('city-name').innerText = data.name;
                    document.getElementById('temperature').innerText = `${data.main.temp}°C`;
                    document.getElementById('feelslike').innerText = `${data.main.feels_like}°C`;
                    document.getElementById('condition').innerText = data.weather[0].description;
                    document.getElementById('wind').innerText = `${data.wind.speed} м/с`;
                    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
                    document.getElementById('pressure').innerText = `${data.main.pressure} гПа`;
                    document.getElementById('cloudiness').innerText = `${data.clouds.all}%`;

                    // Обновляем фон в зависимости от погодных условий
                    const weatherCondition = data.weather[0].main;
                    document.getElementById('background-image').style.backgroundImage = weatherBackgrounds[weatherCondition] || 'url("default.jpg")';

                    // Показываем блок с информацией о погоде
                    document.getElementById('weather-info').classList.remove('hidden');
                } else {
                    alert('Не удалось получить данные о погоде');
                }
            } catch (error) {
                console.error('Ошибка при получении данных погоды по местоположению:', error);
                alert('Произошла ошибка при получении данных о погоде');
            }
        });
    } else {
        alert('Геолокация не поддерживается вашим браузером');
    }
}
