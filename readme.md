


# Api проекта News Exploler

![](bloggif_608b98d0d2acf.gif)

Ссылка на api: https://api.pavlov-news.students.nomoreparties.xyz
## Описание
Проект представляет из себя одностраничное приложение, в котором можно найти свежие статьи на любую тему и сохранить в личном кабинете. Основной функционал доступен после регистрации и авторизации пользователя.
Серверная часть проекта написана на архитектуре <a href='https://ru.wikipedia.org/wiki/REST'>REST<a> , с использованием <a href="https://nodejs.org/en/">NodeJS & npm<a> , фреймворка  <a href='https://expressjs.com'>Express<a>  и СУБД <a href='https://www.mongodb.com/'>MONGODB<a> . Организована централизованная обработка ошибок, сбор логов и валидация приходящих на сервер данных. Особый акцент сделан на безопасности веб-приложения. Облачный сервер для деплоя создан и сконфигурирован на мощностях  <a href='https://cloud.yandex.ru/'>`Yandex.Cloud`<a>. 

# Как все тут устроено?
## Роуты:
### создаёт пользователя с переданными в теле email, password и name
POST /signup

### проверяет переданные в теле почту и пароль и возвращает JWT
POST /signin 

### возвращает информацию о пользователе (email и имя)
GET /users/me

### возвращает все сохранённые пользователем статьи
GET /articles

### создаёт статью с переданными в теле keyword, title, text, date, source, link и image
POST /articles

### удаляет сохранённую статью  по _id
DELETE /articles/articleId 

Как установить проект?
================
## Для начала работы вам необходим:

- <a href="https://nodejs.org/en/">NodeJS & npm<a> - среда выполенния кода JavaScript вне браузера. Позволяет писать серверный код для динамических веб-страниц и веб-приложений.
- <a href="https://gitforwindows.org/">Git Bash<a> если вы используете Windows OS.

## Установка

### Склонировать проект на ПК:

    git clone https://github.com/pavelcydep/servis-mesto-api.git



### Установить зависимости

    npm install






## Технологии:

   ![](node100.png)         ![](exp.png)             ![](mongodb.png)

## Планы по проекту
Улучшить безопасность бэкэнда.

