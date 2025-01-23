// Функция получения погоды по городу
async function getWeather() {
    const city = document.getElementById('city').value;

    // Проверяем, что город введен
    if (!city) {
        alert('Пожалуйста, введите название города.');
        return;
    }

    const apiKey = '21db32bae99a47d88b8195425252301';  // Вставленный API ключ
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ru`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('city-name').innerText = data.location.name;
            document.getElementById('temperature').innerText = data.current.temp_c + '°C';
            document.getElementById('feelslike').innerText = data.current.feelslike_c + '°C';
            document.getElementById('condition').innerText = data.current.condition.text;
            document.getElementById('wind').innerText = data.current.wind_kph + ' км/ч';
            document.getElementById('humidity').innerText = data.current.humidity + '%';
            document.getElementById('pressure').innerText = data.current.pressure_mb + ' мб';
            document.getElementById('cloudiness').innerText = data.current.cloud + '%';

            document.getElementById('weather-info').classList.remove('hidden');
        } else {
            alert('Не удалось получить данные о погоде');
        }
    } catch (error) {
        alert('Произошла ошибка при загрузке данных.');
    }
}

// Функция для получения погоды по текущему местоположению
function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiKey = '21db32bae99a47d88b8195425252301';  // Вставленный API ключ
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&lang=ru`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    document.getElementById('city-name').innerText = data.location.name;
                    document.getElementById('temperature').innerText = data.current.temp_c + '°C';
                    document.getElementById('feelslike').innerText = data.current.feelslike_c + '°C';
                    document.getElementById('condition').innerText = data.current.condition.text;
                    document.getElementById('wind').innerText = data.current.wind_kph + ' км/ч';
                    document.getElementById('humidity').innerText = data.current.humidity + '%';
                    document.getElementById('pressure').innerText = data.current.pressure_mb + ' мб';
                    document.getElementById('cloudiness').innerText = data.current.cloud + '%';

                    document.getElementById('weather-info').classList.remove('hidden');
                } else {
                    alert('Не удалось получить данные о погоде по вашему местоположению');
                }
            } catch (error) {
                alert('Произошла ошибка при загрузке данных по вашему местоположению.');
            }
        }, function (error) {
            alert('Не удалось получить ваше местоположение. Пожалуйста, включите геолокацию.');
        });
    } else {
        alert('Ваш браузер не поддерживает геолокацию.');
    }
}
