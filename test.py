import requests
from dotenv import load_dotenv
import os

# Загружаем .env файл
load_dotenv()

# Получаем API ключ из .env
API_KEY = os.getenv('API_KEY')

# Проверяем, был ли найден ключ
if not API_KEY:
    print('Ошибка: API ключ не найден в .env файле!')
    exit(1)

# Город, для которого хочешь получить погоду
CITY = 'Москва'

# Формируем URL для запроса
url = f'http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={CITY}&lang=ru'

# Отправляем запрос
try:
    response = requests.get(url)
    response.raise_for_status()  # Проверка на успешный статус ответа
    # Получаем данные в формате JSON
    data = response.json()

    # Извлекаем информацию о погоде
    temperature = data['current']['temp_c']  # Температура в градусах Цельсия
    feelslike = data['current']['feelslike_c']  # Ощущаемая температура
    condition = data['current']['condition']['text']  # Состояние погоды (например, облачно)
    wind_speed = data['current']['wind_kph']  # Скорость ветра в км/ч
    humidity = data['current']['humidity']  # Влажность (%)
    pressure = data['current']['pressure_mb']  # Давление (мб)
    cloudiness = data['current']['cloud']  # Облачность (%)

    # Красиво выводим результат
    print(f'Погода в городе {CITY}:\n')
    print(f'🌡️ Температура: {temperature}°C')
    print(f'💨 Ощущается как: {feelslike}°C')
    print(f'🌤️ Состояние: {condition}')
    print(f'💨 Скорость ветра: {wind_speed} км/ч')
    print(f'🌬️ Влажность: {humidity}%')
    print(f'🌫️ Давление: {pressure} мб')
    print(f'☁️ Облачность: {cloudiness}%')

except requests.exceptions.RequestException as e:
    print(f'Ошибка при запросе к API: {e}')
except ValueError:
    print('Ошибка при обработке данных. Невозможно извлечь информацию о погоде.')
