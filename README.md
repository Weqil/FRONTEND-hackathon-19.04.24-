# Запуск

Для того что бы запустить приложение вы можете воспользоваться 2 путями: [Docker](#docker) || Стандартный

## Docker 
для того что бы запустить проект через Docker вам понадобится сам Docker и прописать следующую команду:
```
docker build -t hakaton-2024-zaneslo .
```

После того как образ будет собран вам необходимо его запустить, сделать это можно с помощью следующей команды:
```
docker run -p 8100:80 hakaton-2024-zaneslo
```

## Стандартный запуск
Для того что бы сделать стандртный запуск вам необходимо запустить следующие команды:

```
npm install
npm run dev
```
