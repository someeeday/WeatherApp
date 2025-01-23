// Ваш API-ключ для получения погоды
const API_KEY = '21db32bae99a47d88b8195425252301';  // Замените на ваш API-ключ

const getWeather = async (city) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=ru`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert('Город не найден!');
            return;
        }

        // Извлекаем нужные данные
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;
        const feelslike = data.current.feelslike_c;
        const wind_speed = data.current.wind_kph;
        const humidity = data.current.humidity;

        // Обновляем интерфейс
        document.getElementById('temperature').textContent = `Температура: ${temperature}°C`;
        document.getElementById('condition').textContent = `Состояние: ${condition}`;
        document.getElementById('feelslike').textContent = `Ощущается как: ${feelslike}°C`;
        document.getElementById('wind-speed').textContent = `Скорость ветра: ${wind_speed} км/ч`;
        document.getElementById('humidity').textContent = `Влажность: ${humidity}%`;
    } catch (error) {
        alert('Произошла ошибка при получении данных о погоде.');
    }
};

// Получение данных по текущему местоположению
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&lang=ru`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const temperature = data.current.temp_c;
                    const condition = data.current.condition.text;
                    const feelslike = data.current.feelslike_c;
                    const wind_speed = data.current.wind_kph;
                    const humidity = data.current.humidity;

                    document.getElementById('temperature').textContent = `Температура: ${temperature}°C`;
                    document.getElementById('condition').textContent = `Состояние: ${condition}`;
                    document.getElementById('feelslike').textContent = `Ощущается как: ${feelslike}°C`;
                    document.getElementById('wind-speed').textContent = `Скорость ветра: ${wind_speed} км/ч`;
                    document.getElementById('humidity').textContent = `Влажность: ${humidity}%`;
                })
                .catch(error => alert('Не удалось получить данные о погоде.'));
        });
    } else {
        alert('Ваш браузер не поддерживает геолокацию.');
    }
};

// Обработчик кнопки для отправки местоположения
document.getElementById('get-location-btn').addEventListener('click', getLocation);

// Обработчик для поиска города
document.getElementById('city-search').addEventListener('input', (event) => {
    const city = event.target.value;
    if (city) {
        getWeather(city);
    }
});
