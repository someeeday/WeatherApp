document.addEventListener('DOMContentLoaded', () => {
    // Функция для получения данных о погоде
    async function getWeather() {
        // Получаем API ключ из URL (прежде чем использовать, поместите ключ в HTML или в конфиг)
        const API_KEY = 'YOUR_API_KEY';  // Замените на ваш ключ API
        const CITY = 'Москва';  // Указываем нужный город
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&lang=ru`);
        const data = await response.json();

        // Проверяем, есть ли данные
        if (data && data.current) {
            // Извлекаем нужные данные
            const temperature = data.current.temp_c;  // Температура в °C
            const feelslike = data.current.feelslike_c;  // Ощущаемая температура
            const condition = data.current.condition.text;  // Погода
            const wind_speed = data.current.wind_kph;  // Скорость ветра
            const humidity = data.current.humidity;  // Влажность
            const pressure = data.current.pressure_mb;  // Давление
            const cloudiness = data.current.cloud;  // Облачность

            // Выводим данные на страницу
            document.getElementById('temperature').textContent = `Температура: ${temperature}°C`;
            document.getElementById('feelslike').textContent = `Ощущается как: ${feelslike}°C`;
            document.getElementById('condition').textContent = `Погода: ${condition}`;
            document.getElementById('wind-speed').textContent = `Скорость ветра: ${wind_speed} км/ч`;
            document.getElementById('humidity').textContent = `Влажность: ${humidity}%`;
            document.getElementById('pressure').textContent = `Давление: ${pressure} мб`;
            document.getElementById('cloudiness').textContent = `Облачность: ${cloudiness}%`;
        } else {
            // Если данные не получены
            alert('Не удалось получить данные о погоде.');
        }
    }

    // Вызовем функцию, чтобы сразу загрузить погоду
    getWeather();
});
