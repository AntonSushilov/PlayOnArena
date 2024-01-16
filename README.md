<p align="center">
  <img src="https://github.com/AntonSushilov/stellar_burger_react/assets/39156677/3a9df549-5757-420a-83e3-f575d852dec8">
</p>

# PlayOnArena

## Содержание
- [Описание проекта](#описание-проекта)
- [Реализация](#реализация)
- [Установка](#установка)
- [Использование](#использование)
- [Ссылки](#ссылки)

## Описание проекта
PlayOnArena - веб-сервис по управлению спортивными соревнованиями

## Реализация
Frontend:
- React

Backend:
- Django

## Установка
1. В директоии backend выполнить:
    1. `python -m venv venv` - для создания виртуального окружения
    2. `venv\Scripts\activate.bat` (wWindows) - для активации виртуального окружения
    3. `pip install -r requirements.txt` - для установки зависимостей
    4. `python manage.py migrate` - Для создания бд
    5. `python manage.py runserver` - для запуска backend
    6. Backend запускается по адресу `http://localhost:8000/`
2. В директории frontend выполнить:
    1. `npm i` - для установки зависимостей
    2. `npm start` - для запуска frontend
    3. Frontend запускается по адресу `http://localhost:3000/`

## Настройка
В директоии backend выполнить:
1. `python manage.py createsuperuser` - Для создания супер пользователя
2. `python manage.py upload_all_data` - Для заполнения бд тестовыми данными

## Использование
- В проекте присутствует автоматически сгенерированная документация по endpoints api backend по адресу `/redoc/`
- Админ панель располагается по адресу `/admin/`. Вход осуществляется с помощью учетных данных полученных в результате создания супер пользователя


## Ссылки




